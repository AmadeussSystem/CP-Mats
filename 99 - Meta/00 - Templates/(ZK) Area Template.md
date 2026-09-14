---
tags:
  - area
links: 
deadline: <% tp.date.now("YYYY-MM-DD") %>
area: [[My Areas]]
---
## Related Projects

```base
filters:
  and:
    - file.hasTag("project")
    - file.hasLink(this.file.name)
views:
  - type: table
    name: Related Projects
    order:
      - file.name
      - status
      - deadline
```
