# Meetings MOC

**Template**: [[Meeting Template]]

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

## ICS Meetings for Today


```js-engine
const { IcsTable } = await engine.importJs('scripts/js_engine/ics_table.js');
const icsTable = new IcsTable(null);
await icsTable.render(container);
```

## Meeting Notes

```base
filters:
  and:
    - file.inFolder("07 - Meetings")
    - not:
        - file.hasTag("MOC")
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
