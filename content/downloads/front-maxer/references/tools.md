# Résoudre et utiliser les outils

Résoudre le dossier parent de `front-maxer` comme racine des skills. En installation normale, c’est `$CODEX_HOME/skills`, ou `~/.codex/skills` si cette variable est absente. Les dossiers frères sont `ui-ux-pro-max`, `taste-skill` et `apple-design`. Utiliser les chemins absolus résolus pour les scripts. Les marqueurs entre chevrons ci-dessous sont à remplacer avant exécution.

## Pro Max : recherche locale

Python 3 est nécessaire, sans dépendance supplémentaire. Utiliser l’interpréteur disponible (`python`, `python3`, `py -3` sous Windows, ou le runtime Python fourni par Codex si le lanceur local ne fonctionne pas).

```text
python "<skills-root>/ui-ux-pro-max/scripts/search.py" "studio photography portfolio" --design-system -p "Studio"
python "<skills-root>/ui-ux-pro-max/scripts/search.py" "keyboard focus modal" --domain ux
python "<skills-root>/ui-ux-pro-max/scripts/search.py" "responsive navigation" --stack react
```

Une intention par requête ; passer la stack réellement détectée. Vérifier l’adéquation des résultats avant de les appliquer. En cas de résultat vide ou hors sujet, reformuler une fois puis annoncer le recours à des principes généraux si nécessaire.

La persistance est facultative : lire le système existant avant toute génération. Si elle est utile, passer explicitement `--persist --output-dir "<project-root>"`. Ne pas utiliser `--force` sans autorisation explicite d’écraser les décisions existantes.

## Taste : direction et inspection

Les scripts de direction et de lint utilisent Node 18+ ; l’inspecteur complet nécessite Node 22+ et Chrome, Edge ou Chromium. Lire les scripts ou leur aide pour les options actuelles. Aucun outil n’est à installer automatiquement pour un simple avis de design.

Exécuter depuis le projet. Définir `TASTE_SKILL_HISTORY` vers `<project-root>/.taste-skill/history.json` afin que l’historique reste dans le projet : par défaut, le script écrit un historique partagé dans le dossier utilisateur.

```text
node "<skills-root>/taste-skill/scripts/draw.mjs" --list sectors
node "<skills-root>/taste-skill/scripts/draw.mjs" --sector studio-portfolio --brief "Studio photo culinaire" --sections work,about,contact,footer --options 3
node "<skills-root>/taste-skill/scripts/draw.mjs" --sector studio-portfolio --brief "Studio photo culinaire" --sections work,about,contact,footer --direction <chosen-id>
node "<skills-root>/taste-skill/scripts/lint.mjs" "<source-folder>"
node "<skills-root>/taste-skill/scripts/inspect.mjs" "<local-preview-url>"
```

`--options 3` affiche des propositions sans écrire de direction. La sélection écrit dans `.taste-skill/`. Avec une identité existante, ajouter `--keep palette,type` et reprendre les valeurs de marque. Ne déclarer dans `--have` que les assets réellement disponibles.

Les scripts de recherche d’images accèdent au réseau et peuvent télécharger des fichiers ; ne les utiliser que si des assets sont utiles au travail demandé, avec les outils autorisés dans la session. Vérifier source, licence et crédits. Si l’inspecteur est indisponible ou incompatible avec les outils autorisés, inspecter avec le navigateur disponible et annoncer la limite. Une règle stylistique incompatible avec le brief est une exception motivée ; un défaut de contraste ou une interaction cassée reste à corriger.

## Apple Design : références ciblées

Ouvrir `apple-design/references/hig-lookup.md`, puis les pages nécessaires dans `references/hig/`. Pour une revue complète, suivre les ensembles de lecture du skill ; pour une question ciblée, ne lire que les références pertinentes. `references/cross-platform.md` traduit les conventions pour Flutter, React Native, Tauri et Electron.

Citer uniquement les sections effectivement lues. Les références locales constituent un instantané ; vérifier la documentation Apple officielle lorsqu’une version récente de plateforme ou une affirmation de conformité actuelle est déterminante. Le script `pull-hig.mjs` sert à maintenir le corpus, pas à exécuter une revue ordinaire.
