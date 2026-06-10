# Циклы — ski-transfer-price-checker

## Feature Cycle (quick: генерация Sprint TZ)
/loop C:\Users\User\AI_Agents\rules\cycles\prompts\feature_cycle.md
Читает: cycles_config.md + concept_{slug}.md
Пишет: sprints/sprint_N/ (6 файлов TZ)

## Issues Cycle (генерация атомарных issues из TZ)
/loop C:\Users\User\AI_Agents\rules\cycles\prompts\issues_cycle.md
Читает: sprints/sprint_N/02_epics_user_stories.md
Пишет: sprints/sprint_N/sprint_N_issues.md

## Dev Cycle (разработка)
/loop C:\Users\User\my-projects\ski_transfer_price_checker\.claude\dev_cycle_ski-transfer-price-checker.md
Нужно перед запуском: убедиться что frontend-зависимости установлены (npm install)

## Порядок для нового спринта:
1. feature_cycle → TZ спринта (6 файлов на спринт)
2. issues_cycle → sprint_N/sprint_N_issues.md (атомарные задачи для агентов)
3. dev_cycle → реализация до ready_for_qa
