---
cssclasses: []
---
# Home

Overview of vault content.
## Areas

```base
filters:
  and:
    - file.hasTag("area")
    - '!file.inFolder("99 - Meta/00 - Templates")'
views:
  - type: table
    name: Areas
    order:
      - file.name
    sort:
      - property: file.name
        direction: ASC
```
## Projects

```base
filters:
  and:
    - file.hasTag("project")
    - '!file.path.contains("99 - Meta/00 - Templates")'
views:
  - type: table
    name: Projects
    order:
      - file.name
      - status
      - deadline
      - area
    sort:
      - property: deadline
        direction: ASC
```
