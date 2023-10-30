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
