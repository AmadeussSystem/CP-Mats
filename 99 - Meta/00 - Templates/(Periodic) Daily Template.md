---
<%*
// Daily note setup

const fileDate = tp.date.now('YYYY-MM-DD', 0, tp.file.title, 'YYYY-MM-DD');

const Momentary = tp.user.momentary;
const thisMoment = new Momentary(fileDate);

const today = thisMoment.englishDay();
const readableDay = thisMoment.prettyDay();
const dayName = thisMoment.dayName();
%>
date: <%  thisMoment.timestamp() %>
tags:
  - Daily
cssclasses:
  - daily
  <% "- " + dayName.toLowerCase() %>
---
# Day of <% today %>

<span class="subtitle"><% readableDay %></span>

---

## Journal

TODO

---

## Tasks

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Meetings

### ICS Meetings

```js-engine
const { IcsTable } = await engine.importJs('scripts/js_engine/ics_table.js');
const today = moment('<% thisMoment.timestamp() %>');
const icsTable = new IcsTable(null, today);
await icsTable.render(container);
```

### Current Notes

```base
filters:
  and:
    - file.hasTag("Meeting")
    - 'file.ctime >= date("<% fileDate %>")'
    - 'file.ctime <= date("<% fileDate %> 23:59:59")'
    - '!file.path.contains("99 - Meta")'
views:
  - type: table
    name: Meeting Notes
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

## Meta

### Created Today

```base
filters:
  and:
    - 'file.ctime >= date("<% fileDate %>")'
    - 'file.ctime <= date("<% fileDate %> 23:59:59")'
views:
  - type: table
    name: Created Today
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
