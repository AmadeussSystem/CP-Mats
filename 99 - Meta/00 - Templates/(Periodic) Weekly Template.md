---
date: <% tp.date.now("YYYY-MM-DD") %>T<% tp.date.now("HH:mm") %>
tags:
  - Weekly
cssclasses:
  - <% "daily" %>
  - sunday
---
<%*

// Weekly note setup

const Momentary = tp.user.momentary;
const thisMoment = new Momentary(tp.date);

const {
  startOfWeek,
  endOfWeek,
  weekNumber,
  shortStartOfWeek,
  englishEndOfWeek
} = thisMoment.properties();

-%>
# Week <% weekNumber %>

<span class="subtitle">
  From <% shortStartOfWeek %> to <% englishEndOfWeek %>
</span>

---

## Journal

TODO

---

## Meetings

```meta-bind-button
label: New Meeting
hidden: false
class: ""
tooltip: "Create new meeting"
id: ""
style: default
actions:
  - type: templaterCreateNote
    templateFile: 99 - Meta/00 - Templates/Meeting Template.md
    folderPath: "07 - Meetings"
    fileName: TKTK
    openNote: true
```

```base
filters:
  and:
    - file.hasTag("Meeting")
    - 'file.ctime >= date("<% startOfWeek %>")'
    - 'file.ctime <= date("<% endOfWeek %>")'
    - '!file.folder.contains("99 - Meta")'
    - '!file.name.contains("Placeholder")'
views:
  - type: table
    name: Meetings
    order:
      - file.name
      - file.ctime
      - summary
    properties:
      file.ctime:
        displayName: Created
    sort:
      - property: file.ctime
        direction: DESC
```

## References

### Daily Notes

```base
filters:
  and:
    - file.hasTag("daily")
    - 'file.ctime >= date("<% startOfWeek %>")'
    - 'file.ctime <= date("<% endOfWeek %>")'
    - '!file.folder.contains("99 - Meta")'
    - '!file.name.contains("Placeholder")'
views:
  - type: table
    name: Daily Notes
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
    file.cday >= date(<% startOfWeek %>)
    AND file.cday <= date(<% endOfWeek %>)
    AND !contains(file.folder, "99 - Meta")
    AND !contains(file.name, "Placeholder")
    AND !completed
  GROUP BY file.link
```

### Created This Week

```base
filters:
  and:
    - 'file.ctime >= date("<% startOfWeek %>")'
    - 'file.ctime <= date("<% endOfWeek %>")'
    - '!file.folder.contains("99 - Meta")'
    - '!file.name.contains("Placeholder")'
views:
  - type: table
    name: Created This Week
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

### Modified This Week

```base
filters:
  and:
    - 'file.mtime >= date("<% startOfWeek %>")'
    - 'file.mtime <= date("<% endOfWeek %>")'
    - '!file.folder.contains("99 - Meta")'
    - '!file.name.contains("Placeholder")'
views:
  - type: table
    name: Modified This Week
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
