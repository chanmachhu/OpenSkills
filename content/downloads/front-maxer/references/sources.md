# Sources installées

Installation préparée le 15 octobre 2026 à partir de versions Git figées. Les dépendances restent dans leurs propres dossiers pour pouvoir être utilisées séparément et mises à jour sans dupliquer leur documentation dans `front-maxer`.

| Dossier / nom Codex | Dépôt | Chemin source | Commit |
| --- | --- | --- | --- |
| `ui-ux-pro-max` | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | `.claude/skills/ui-ux-pro-max` | `56ea9cf174ed86786187daa9de0e6247cb0747e4` |
| `apple-design` | https://github.com/dickwu/apple-design-skill | racine | `904b0eedc7cc778152f545506075d5bb5219ce77` |
| `taste-skill` | https://github.com/Leonxlnx/taste-skill | `skills/taste-skill` | `f624f37a8c650b9cc550253104925efe4c8de246` |

Adaptations locales :

- Le nom interne de Taste passe de `design-taste-frontend` à `taste-skill` pour éviter une collision avec le skill déjà installé. Le contenu de la nouvelle version reste séparé de l’ancien.
- Les exemples Pro Max désignent le dossier réel du skill au lieu de dépendre de `CLAUDE_PLUGIN_ROOT`.
- Les licences présentes à la racine des dépôts Pro Max et Taste sont conservées dans leurs dossiers installés. Aucune licence supplémentaire n’est attribuée au corpus Apple.
- `front-maxer` apporte le routage et les règles d’arbitrage ; les scripts et jeux de données des sources ne sont pas réécrits.

Après une mise à jour, vérifier les noms, les chemins, les commandes de recherche et les règles potentiellement contradictoires. Conserver les personnalisations existantes ; ne pas écraser silencieusement un dossier installé.
