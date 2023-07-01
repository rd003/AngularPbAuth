migrate((db) => {
  const collection = new Collection({
    "id": "9d7yg7jb05nwy4z",
    "created": "2023-06-30 09:46:59.392Z",
    "updated": "2023-06-30 09:46:59.392Z",
    "name": "Categories",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vsbktwlo",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("9d7yg7jb05nwy4z");

  return dao.deleteCollection(collection);
})
