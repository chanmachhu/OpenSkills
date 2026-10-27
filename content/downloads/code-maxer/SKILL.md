---
name: code-maxer
description: Sélectionne et combine les skills pertinents de la banque locale de 52 skills de développement logiciel pour réaliser une tâche de code. À utiliser quand l'utilisateur appelle code-maxer ou demande de choisir les meilleurs skills de cette banque pour implémenter, corriger, tester, examiner ou concevoir du logiciel.
---

# Code Maxer

Point d'entrée de la banque installée depuis `jeffallan/claude-skills`. Choisir les spécialistes adaptés, lire leurs instructions, puis réaliser la demande. La sélection seule ne constitue pas le résultat attendu, sauf si l'utilisateur demande seulement un conseil de sélection.

## Sélection

1. Identifier le résultat demandé et la phase : conception, implémentation, correction, tests, revue, optimisation ou exploitation. Utiliser le contexte disponible et, pour un dépôt, examiner ses consignes, dépendances et fichiers pertinents pour reconnaître sa stack.
2. Consulter [la banque et ses critères de routage](references/skill-bank.md). Choisir le plus petit ensemble qui couvre le besoin : souvent un spécialiste principal et un ou deux compléments, davantage si plusieurs couches le justifient. Ce nombre est indicatif.
3. Donner priorité aux choix explicites de l'utilisateur et à la stack existante. Entre deux skills voisins, préférer le plus spécifique au problème. Ajouter un complément pour une lacune concrète, sans charger plusieurs spécialistes qui répètent les mêmes conseils.
4. Annoncer brièvement les skills retenus et leur utilité avant de les appliquer. Ne pas attendre de confirmation pour une sélection ordinaire.

## Chargement et exécution

- Lire le `SKILL.md` de chaque skill retenu **avant de l'appliquer**. Le catalogue sert au routage ; il ne remplace pas les instructions du spécialiste.
- Utiliser le chemin déclaré dans les skills disponibles de la session. À défaut, les skills de cette banque sont des dossiers voisins : `../<nom-du-skill>/SKILL.md`, résolus depuis le dossier de `code-maxer`.
- Résoudre les références depuis le dossier du spécialiste concerné. Charger uniquement les références utiles à la phase en cours, au moment où elles deviennent nécessaires.
- Si un skill manque, vérifier son dossier local ; s'il est réellement absent, signaler la limite et choisir un spécialiste disponible ou poursuivre avec les outils ordinaires. Ne pas inventer son contenu ni installer automatiquement un remplaçant.
- Appliquer les spécialistes au fil du travail. Réévaluer la sélection si les fichiers ou erreurs révèlent une autre stack ou une autre cause. Pour une tâche complexe, distinguer les besoins immédiats de ceux des phases suivantes.
- Effectuer les modifications et vérifications adaptées à la demande. Une mention de « handoff » dans un spécialiste désigne ici un passage à une autre compétence : poursuivre soi-même avec le skill concerné. Elle ne requiert pas de créer un agent ou un autre chat.

## Arbitrage et périmètre

- Adapter les recettes à la taille de la tâche et aux conventions du projet. Une petite correction ne nécessite pas automatiquement un document d'architecture, une migration, un audit de sécurité ou une suite complète de tests.
- `fullstack-guardian` convient à un flux qui traverse réellement frontend et backend ; une modification isolée d'un composant relève d'abord du spécialiste frontend.
- `debugging-wizard` guide la recherche de cause ; le spécialiste de la stack aide à réparer. `test-master` ou `playwright-expert` intervient lorsque le besoin de tests le justifie.
- Distinguer sécurité d'implémentation (`secure-code-guardian`), revue globale (`code-reviewer`) et audit de sécurité (`security-reviewer`). Un audit spécialisé doit correspondre à la demande ou à un besoin concret.
- Les instructions de l'utilisateur, les règles de la session et les consignes applicables du dépôt priment sur les recettes de cette banque. En cas de conflit entre spécialistes, conserver l'approche compatible avec la stack, la phase et le périmètre demandé.
- L'appel à ce skill ne donne pas d'autorisation supplémentaire pour publier, déployer, envoyer des messages ou modifier des services externes.

Terminer par le résultat obtenu, les vérifications effectuées et les limites qui comptent pour l'utilisateur. Ne pas présenter la présence de skills comme une garantie de qualité ou d'expertise.
