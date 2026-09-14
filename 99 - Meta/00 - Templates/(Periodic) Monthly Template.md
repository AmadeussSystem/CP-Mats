---
date: <% tp.date.now("YYYY-MM-DD") %>T<% tp.date.now("HH:mm") %>
tags:
  - Monthly
cssclasses:
  - daily
  - monday
---
<%*

// Weekly note setup

const dateFormat = 'YYYY-MM-DD';

const now = tp.date.now(dateFormat);
const nowMoment = moment(now, dateFormat);

const monthNumber = tp.date.now('MM');

const startOfMonth = nowMoment.startOf('month').format(dateFormat);
const endOfMonth = nowMoment.endOf('month').format(dateFormat);

const monthName = tp.date.now('MMMM');

-%>
# Month of <% monthName %>

<span class="subtitle">
  From <% startOfMonth %> to <% endOfMonth %>
</span>

---

## Journal

TODO

---

## References

### Weekly Notes

```base
filters:
  and:
    - file.hasTag("weekly")
    - 'file.ctime >= date("<% startOfMonth %>")'
    - 'file.ctime <= date("<% endOfMonth %>")'
views:
  - type: table
    name: Weekly Notes
    order:
      - file.name
      - file.mtime
    properties:
      file.mtime:
        displayName: Modified
    sort:
      - property: file.ctime
        direction: ASC
```

#### Incomplete Tasks

```dataview
TASK
  FROM #daily
  WHERE
    file.cday >= date(<% startOfMonth %>)
    AND file.cday <= date(<% endOfMonth %>)
    AND !completed
  GROUP BY file.link
```

### Created This Month

```base
filters:
  and:
    - 'file.ctime >= date("<% startOfMonth %>")'
    - 'file.ctime <= date("<% endOfMonth %>")'
    - '!file.folder.contains("99 - Meta")'
    - '!file.name.contains("Placeholder")'
views:
  - type: table
    name: Created This Month
    order:
      - file.name
      - file.ctime
      - file.folder
      - file.tags
    properties:
      file.ctime:
        displayName: Created
      file.folder:
        displayName: Folder
      file.tags:
        displayName: Tags
    sort:
      - property: file.ctime
        direction: ASC
```

### Modified This Month

```base
filters:
  and:
    - 'file.mtime >= date("<% startOfMonth %>")'
    - 'file.mtime <= date("<% endOfMonth %>")'
    - 'file.ctime < date("<% startOfMonth %>")'
    - '!file.folder.contains("99 - Meta")'
    - '!file.name.contains("Placeholder")'
views:
  - type: table
    name: Modified This Month
    order:
      - file.name
      - file.mtime
      - file.folder
      - file.tags
    properties:
      file.mtime:
        displayName: Modified
      file.folder:
        displayName: Folder
      file.tags:
        displayName: Tags
    sort:
      - property: file.mtime
        direction: ASC
```