---
name: front-maxer
description: Conçoit, implémente, améliore et audite des interfaces frontend en combinant UI UX Pro Max, Taste et Apple Design. À utiliser pour les sites, landing pages, portfolios, dashboards, composants et interfaces mobiles ou desktop nécessitant des décisions de design, de responsive, d’accessibilité ou d’interaction.
---

# Front Maxer

Combiner trois expertises pour livrer une interface cohérente avec le produit, son public et sa plateforme : recherche UI/UX, direction artistique et revue ergonomique. Répondre dans la langue de l’utilisateur.

## Charger les bonnes sources

Les trois skills sont installés à côté de ce dossier. Résoudre les liens depuis ce fichier, jamais depuis le répertoire du projet. Lire le `SKILL.md` des sources retenues avant de les appliquer ; ouvrir leurs références selon le besoin, sans charger toutes les bibliothèques.

| Source | Apport et contexte |
| --- | --- |
| [UI UX Pro Max](../ui-ux-pro-max/SKILL.md) | Recherche : structure, tokens, couleurs, typographie, accessibilité, interactions et recommandations par stack. Pour les décisions UI/UX et les problèmes ciblés. |
| [Taste](../taste-skill/SKILL.md) | Direction artistique, contenu, composition, images et critique visuelle des pages publiques : landing, portfolio, marketing, page produit. Son workflow complet ne s’applique pas aux dashboards ni aux écrans applicatifs. |
| [Apple Design](../apple-design/SKILL.md) | Revue des interfaces mobiles et desktop, navigation, contrôles, feedback et ergonomie. Sur le web ou Android, utiliser les principes transférables ; réserver les conventions Apple à la plateforme concernée. |

Pour une page marketing, combiner Pro Max et Taste ; ajouter Apple Design si un problème ergonomique le justifie. Pour une application ou un dashboard, combiner Pro Max et Apple Design. Une correction locale peut ne demander qu’une source. Une demande explicitement centrée sur les trois sources peut les mobiliser toutes, avec ce périmètre.

Si une source manque, signaler précisément laquelle et poursuivre les parties réalisables avec les autres. Ne pas prétendre l’avoir appliquée ni la réinstaller automatiquement. Les commandes sont détaillées dans [references/tools.md](references/tools.md) ; les versions installées dans [references/sources.md](references/sources.md).

## Arbitrer les recommandations

- Respecter d’abord le brief, les assets, les fonctionnalités et le système de design du projet. Une préférence esthétique d’une source ne remplace pas les choix explicites de l’utilisateur.
- Choisir une direction visuelle commune. Pro Max propose une base ; Taste peut en préciser la composition ou l’identité ; Apple Design vérifie l’usage et les conventions pertinentes. Ne pas empiler trois palettes ni trois systèmes typographiques.
- Traiter les règles stylistiques de Taste comme son mode de direction artistique pour les pages publiques. Ses quotas d’images ou de mouvements, ses interdictions de couleurs, de filets ou de verre ne sont pas des exigences universelles de `front-maxer`. Garder les choix du projet lorsqu’ils répondent au brief ; expliquer les exceptions utiles.
- Donner priorité à la lisibilité, au fonctionnement, à l’accessibilité et aux conventions de la plateforme sur l’ornement. Une application dense peut nécessiter tableaux, séparateurs, contrôles adaptés au pointeur et faible animation. Un style Apple ne signifie pas ajouter du verre partout.
- Ne pas transformer des valeurs en points natifs en exigences CSS sans contexte. Vérifier les critères applicables avant d’affirmer une conformité. Distinguer une mesure, une recommandation documentée et un jugement esthétique.
- Conserver la stack détectée et les dépendances utiles existantes. Ne pas imposer React, Tailwind, une police ou une bibliothèque d’animation à cause d’un exemple dans une source.

## Exécuter la demande

1. **Comprendre et inspecter.** Identifier le produit, le public, l’action principale, la plateforme, la stack, le contenu réel et les assets. Sur un projet existant, examiner les écrans et les composants à préserver. Poser une question seulement si une information manquante change réellement la suite ; sinon annoncer brièvement l’hypothèse retenue.
2. **Cadrer la direction.** Pour une nouvelle interface ou une refonte globale, utiliser la recherche de système de design Pro Max. Pour un correctif, privilégier une recherche ciblée. Pour une page publique sans direction établie, utiliser Taste pour proposer puis choisir une composition liée au sujet. Un composant isolé reprend la direction environnante.
3. **Unifier les décisions.** Retenir une hiérarchie, des tokens sémantiques, une échelle typographique, une logique d’espacement et une intention de mouvement. Réutiliser la documentation de design existante. Documenter les décisions durables lorsque le périmètre le justifie, sans créer de dossier de design pour chaque petit correctif.
4. **Implémenter ou auditer selon la demande.** Une demande de construction ou d’amélioration doit aboutir au code fonctionnel dans l’environnement disponible. Une demande de revue reste une revue avec constats et corrections concrètes. Prévoir les états pertinents : chargement, vide, erreur, succès, focus et désactivation. Utiliser du contenu réel ; identifier les exemples et ne pas inventer de témoignages ou de preuves commerciales.
5. **Vérifier le résultat.** Exécuter les vérifications pertinentes du projet. Inspecter le rendu aux tailles compactes et larges utiles, les débordements, la lisibilité, le clavier et les interactions principales ; vérifier la réduction des animations si elles existent. Pour une application native, utiliser les outils adaptés à sa plateforme. Les outils Taste complètent cette inspection lorsque leur mode convient.
6. **Corriger et livrer.** Corriger d’abord les défauts d’usage puis les défauts visuels observés. Limiter la boucle esthétique à trois passes et indiquer les limites restantes. Résumer ce qui a changé, ce qui a été réellement vérifié et ce qui nécessite encore du contenu ou une intégration. Ne jamais annoncer une capture, un audit ou un test qui n’a pas été réalisé.

Les scores et règles des outils Taste mesurent leur propre direction stylistique, pas une qualité universelle. Examiner les captures même si les outils passent ; ne pas ajouter d’images ou d’animations inutiles uniquement pour satisfaire un seuil.

## Exemples d’utilisation

- « Utilise $front-maxer pour créer une landing page pour mon studio photo. »
- « Avec $front-maxer, améliore ce dashboard en gardant ses composants et sa densité. »
- « Utilise $front-maxer pour auditer les écrans de mon application Flutter. »
- « Corrige le responsive de cette carte avec $front-maxer, sans refaire toute la page. »
