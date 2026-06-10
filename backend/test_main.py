from fastapi.testclient import TestClient

from main import app, _get_multiplier, _base_rate

client = TestClient(app)


class TestGetMultiplier:
    def test_1_passenger(self):
        assert _get_multiplier(1) == 1.0

    def test_2_passengers(self):
        assert _get_multiplier(2) == 0.9

    def test_3_passengers(self):
        assert _get_multiplier(3) == 0.8  # tier 4

    def test_4_passengers(self):
        assert _get_multiplier(4) == 0.8

    def test_5_passengers(self):
        assert _get_multiplier(5) == 0.7  # tier 6

    def test_6_passengers(self):
        assert _get_multiplier(6) == 0.7

    def test_7_passengers(self):
        assert _get_multiplier(7) == 0.6  # tier 8

    def test_8_passengers(self):
        assert _get_multiplier(8) == 0.6


class TestPriceFormula:
    def test_tc207_formula(self):
        # TC-2-07: distance=155, passengers=1 → 387.50
        price = round(155 * _base_rate * _get_multiplier(1), 2)
        assert price == 387.50

    def test_group_discount_applied(self):
        price_1 = round(160 * _base_rate * _get_multiplier(1), 2)
        price_4 = round(160 * _base_rate * _get_multiplier(4), 2)
        assert price_4 < price_1


class TestRoutesEndpoint:
    def test_status_200(self):
        assert client.get("/api/routes").status_code == 200

    def test_min_6_routes(self):
        assert len(client.get("/api/routes").json()) >= 6

    def test_required_fields(self):
        for route in client.get("/api/routes").json():
            assert {"id", "from_airport", "from_name", "to_resort", "to_name"} <= route.keys()

    def test_gva_and_zrh_present(self):
        airports = {r["from_airport"] for r in client.get("/api/routes").json()}
        assert "GVA" in airports and "ZRH" in airports


class TestCalculateEndpoint:
    _payload = {"from_airport": "GVA", "to_resort": "verbier", "passengers": 1, "date": "2026-01-15"}

    def test_200_and_fields(self):
        r = client.post("/api/calculate", json=self._payload)
        assert r.status_code == 200
        data = r.json()
        assert data["price_chf"] > 0
        assert data["passengers"] == 1
        assert data["currency"] == "CHF"
        assert "route_name" in data and "distance_km" in data

    def test_group_discount(self):
        r1 = client.post("/api/calculate", json={**self._payload, "passengers": 1})
        r4 = client.post("/api/calculate", json={**self._payload, "passengers": 4})
        assert r4.json()["price_chf"] < r1.json()["price_chf"]

    def test_unknown_route_404(self):
        r = client.post("/api/calculate", json={**self._payload, "from_airport": "LHR"})
        assert r.status_code == 404
        assert r.json()["detail"] == "Route not found"

    def test_passengers_0_422(self):
        r = client.post("/api/calculate", json={**self._payload, "passengers": 0})
        assert r.status_code == 422

    def test_passengers_9_422(self):
        r = client.post("/api/calculate", json={**self._payload, "passengers": 9})
        assert r.status_code == 422

    def test_missing_fields_422(self):
        r = client.post("/api/calculate", json={"from_airport": "GVA", "to_resort": "verbier"})
        assert r.status_code == 422

    def test_lowercase_airport_200(self):
        r = client.post("/api/calculate", json={**self._payload, "from_airport": "gva"})
        assert r.status_code == 200

    def test_past_date_200(self):
        r = client.post("/api/calculate", json={**self._payload, "date": "2020-01-01"})
        assert r.status_code == 200
