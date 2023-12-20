# Utilisateurs

## Enregistrement

### Web

Le site web enregistre un nouvelle utilisateur en envoyant un formulaire à `/api/signup`. Le serveur enregistre alors l'identifiant et un hash du mot de passe dans la base de donnée.

### Mobile

On crée de la même façon un utilisateur pour l'application mobile, mais en communiquant les informations dans le corps de la requête par JSON.

## Authentification

### Web

Le site envoie les identifiants de l'utilisateur à `/api/login` , qui si ils sont corrects, remplie un cookie avec un identifiant de session.

### Mobile

L'application envoie les identifiants de l'utilisateur à `/api/mobile/login`. Le serveur envoie alors un JWT qui devra être envoyée avec chaque autre requête.

## Autorization

Chaque route est protégée. Pour savoir si elle vient de l'application ou du site web, on regarde le type l'agent utilisateur. Si c'est un ordinateur, on regarde les cookies. Si c'est un mobile, on regarde le JWT. Si l'utilisateur n'existe pas, on redirige la requête vers la page de login. Sinon, un objet `session` est peuplée des informations de l'utilisateur, ce qui permet d'afficher ses informations.

## OAuth

On peut aussi s'authentifier grâce a notre compte en ligne favori. Il suffit de faire une requéte à `/api/<nom_du_service`. Le reste ce passe sur le serveur.
