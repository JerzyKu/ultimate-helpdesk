|         roles | admin | Helpdesk |             user             |
| ------------: | :---: | :------: | :--------------------------: |
|  create asset |   V   |    X     |              X               |
|   read assets |   V   |    V     | V (only assing to this user) |
|  update asset |   V   |    X     |              X               |
|  delete asset |   V   |    X     |              X               |
|   issue asset |   V   |    V     |              X               |
| unissue asset |   V   |    V     |              X               |

Know bugs:

- [fixed] can issue asset to inactive user
- [fixed] can delete issued asset
- [fixed] can delete user which have assign assets


Api endpoints: 

POST /auth

GET /auth/refresh

POST /auth/logout


GET /assets

GET /assets/{:id}

DELETE /assets/{:id}

POST /assets

PATCH /assets/issue

PATCH /assets/unissue

PATCH /assets


GET /users

POST /users

PUT /users

DELETE /users/{:id}

// --- //


uwagi Szymona: 
 - Po najechaniu na ikonę nie wyświetla się opis wykonywanej funkcji
 - ogarnąć errory w alertach