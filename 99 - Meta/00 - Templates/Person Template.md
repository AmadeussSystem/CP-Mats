---
email:
level:
role:
relation:
company:
organization:
team:
tags:
---
<% await tp.file.rename(tp.file.title) -%>
# [[<% tp.file.title %>]]
## Summary

TODO

## Notes

TODO

## References

### Meetings


```base
filters:
  and:
    - file.hasTag("Meeting")
    - 'participants.contains(this.file.name)'
views:
  - type: table
    name: Meetings
    order:
      - file.name
      - summary
      - participants
    properties:
      file.name:
        displayName: Link
      summary:
        displayName: Summary
      participants:
        displayName: Participants
    sort:
      - property: file.ctime
        direction: DESC
```
