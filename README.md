|         roles | admin | Helpdesk |             user             |
| ------------: | :---: | :------: | :--------------------------: |
|  create asset |   V   |    X     |              X               |
|   read assets |   V   |    V     | V (only assing to this user) |
|  update asset |   V   |    X     |              X               |
|  delete asset |   V   |    X     |              X               |
|   issue asset |   V   |    V     |              X               |
| unissue asset |   V   |    V     |              X               |

Know bugs:

- can issue asset to inactive user
- can delete user which have assign assets
- can delete issued asset
