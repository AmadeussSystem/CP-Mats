---
status: 🟥🟨🟩
tags:
  - project
links: 
deadline: <% tp.date.now("YYYY-MM-DD") %>
area: [[My Areas]]
---
## Related Resources

```base
filters:
  and:
    - file.hasTag("resource")
    - file.hasLink(this.file.name)
views:
  - type: table
    name: Related Resources
    order:
      - file.name
```
