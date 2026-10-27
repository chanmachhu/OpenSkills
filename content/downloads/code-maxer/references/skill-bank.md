# Banque de développement : 52 skills

Sélection locale installée depuis `jeffallan/claude-skills`. Chaque nom correspond à un dossier voisin de `code-maxer` contenant `SKILL.md`. Les descriptions et chemins actuels de la session priment ; ce tableau guide la sélection sans remplacer les consignes.

## Méthode, qualité et sécurité

| Skill | Le choisir pour |
| --- | --- |
| `feature-forge` | Clarifier une fonctionnalité, ses exigences et critères d'acceptation lorsqu'ils restent à définir. |
| `architecture-designer` | Concevoir ou évaluer l'architecture globale et ses compromis. |
| `fullstack-guardian` | Implémenter un flux intégré entre interface, API et données. |
| `debugging-wizard` | Reproduire un bug, isoler sa cause et vérifier une correction. |
| `code-reviewer` | Examiner un diff pour la correction, les performances et la maintenabilité. |
| `test-master` | Stratégie de tests, tests unitaires, d'intégration ou de performance. |
| `playwright-expert` | Tests E2E Playwright, fixtures et tests instables. |
| `secure-code-guardian` | Implémenter authentification, autorisation, validation et protections. |
| `security-reviewer` | Audit de vulnérabilités du code, des dépendances ou de l'infrastructure. |
| `code-documenter` | Docstrings, documentation technique, API et guides. |
| `spec-miner` | Comprendre un code peu documenté et en extraire son fonctionnement. |
| `legacy-modernizer` | Modernisation progressive d'un système ancien. |

## Langages

| Skill | Le choisir pour |
| --- | --- |
| `python-pro` | Python, typage, async, erreurs et outillage pytest/mypy/ruff. |
| `javascript-pro` | JavaScript, Node.js, ESM et programmation asynchrone. |
| `typescript-pro` | Types complexes, génériques, configuration et contrats TypeScript. |
| `golang-pro` | Go, concurrence, interfaces, services et performances. |
| `rust-engineer` | Rust, ownership, lifetimes, traits et async. |
| `cpp-pro` | C++, mémoire, concurrence, performances et CMake. |
| `csharp-developer` | C#, ASP.NET Core, Entity Framework et Blazor. |
| `java-architect` | Java d'entreprise, Spring, JPA et traitement réactif. |
| `kotlin-specialist` | Kotlin, coroutines, Flow, KMP, Compose et Ktor. |
| `swift-expert` | Swift, SwiftUI, UIKit, acteurs et concurrence. |
| `php-pro` | PHP moderne, typage, Composer et pratiques Laravel/Symfony. |
| `sql-pro` | SQL, schémas, jointures, agrégations et optimisation selon le dialecte. |

## Frontend et mobile

| Skill | Le choisir pour |
| --- | --- |
| `react-expert` | Composants React, hooks, état et problèmes de rendu. |
| `nextjs-developer` | Next.js, App Router, composants serveur, actions et routes. |
| `vue-expert` | Vue 3, Composition API, Pinia, Nuxt et TypeScript. |
| `vue-expert-js` | Vue en JavaScript sans TypeScript, JSDoc et migration JS. |
| `angular-architect` | Angular, standalone, signals, RxJS et NgRx. |
| `react-native-expert` | React Native/Expo, navigation et intégrations natives. |
| `flutter-expert` | Flutter/Dart, widgets, Riverpod/Bloc et navigation. |

## Backend et protocoles

| Skill | Le choisir pour |
| --- | --- |
| `fastapi-expert` | FastAPI, Pydantic, endpoints async et SQLAlchemy. |
| `django-expert` | Django, ORM, modèles, DRF, serializers et viewsets. |
| `nestjs-expert` | Modules, contrôleurs, services, guards et injection NestJS. |
| `spring-boot-engineer` | Configuration et implémentation Spring Boot, REST, Security et JPA. |
| `dotnet-core-expert` | Architecture .NET, minimal APIs, CQRS et services. |
| `laravel-specialist` | Laravel, Eloquent, Sanctum, queues et Livewire. |
| `rails-expert` | Rails, Active Record, Hotwire, Action Cable et Sidekiq. |
| `api-designer` | Contrats REST/GraphQL, ressources, erreurs, pagination et OpenAPI. |
| `graphql-architect` | Schémas, resolvers, DataLoader, fédération et subscriptions GraphQL. |
| `websocket-engineer` | WebSocket/Socket.IO et communication temps réel. |
| `mcp-developer` | Serveurs/clients MCP, outils, ressources et transports. |
| `cli-developer` | Applications CLI, arguments, sous-commandes et terminal. |
| `microservices-architect` | Frontières de services, DDD, distribution et résilience. |

## Données et exploitation

| Skill | Le choisir pour |
| --- | --- |
| `database-optimizer` | Requêtes lentes, index, verrous et performances PostgreSQL/MySQL. |
| `postgres-pro` | PostgreSQL, JSONB, réplication, VACUUM et fonctionnalités du moteur. |
| `devops-engineer` | Docker, CI/CD, automatisation et configuration de livraison. |
| `cloud-architect` | Architecture cloud, migrations, coûts et reprise après sinistre. |
| `terraform-engineer` | Terraform, modules, providers, état et environnements. |
| `kubernetes-specialist` | Kubernetes, manifests, Helm, RBAC, réseau et pods. |
| `monitoring-expert` | Logs, métriques, tracing, alertes et profilage. |
| `sre-engineer` | Fiabilité, SLI/SLO, budgets d'erreur et procédures d'incident. |

## Combinaisons utiles

Exemples contextualisés, pas des pipelines obligatoires :

- Bug de rendu React : `debugging-wizard` et `react-expert`. Ajouter `nextjs-developer` si les mécanismes Next.js sont en cause.
- Fonctionnalité Next.js/FastAPI traversant l'interface et l'API : `fullstack-guardian`, puis les spécialistes Next.js et FastAPI selon les fichiers travaillés. Ajouter un spécialiste des tests si une vérification pertinente le demande.
- Revue d'une PR TypeScript : `code-reviewer`, puis `typescript-pro` si les types sont un enjeu ; `security-reviewer` si un audit est demandé.
- Requête PostgreSQL lente : `database-optimizer` ; `postgres-pro` pour les mécanismes du moteur, ou `sql-pro` pour une réécriture complexe.
- Échec de CI Docker : `debugging-wizard` et `devops-engineer`. Ajouter `kubernetes-specialist` si le problème concerne Kubernetes.
- Compréhension d'une application ancienne : `spec-miner`. Ajouter `legacy-modernizer` si sa modernisation fait partie de la demande.

Pour un framework nommé, partir de son spécialiste ; charger le spécialiste de langage seulement si un problème propre au langage le justifie. Pour une demande limitée à une revue ou à une conception, conserver ce périmètre.
