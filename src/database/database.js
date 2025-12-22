import fs from "node:fs/promises";

const DATABASE_PATH = new URL("db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(DATABASE_PATH, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }
    this.#persist();
  }

  select(table, filters) {
    let data = this.#database[table] ?? [];

    if (filters) {
      data = data.filter((row) => {
        return Object.entries(filters).every(([key, value]) => {
          const field = row[key];
          if (typeof field === "string") {
            return field.toLowerCase() === value.toLowerCase();
          }
          return field === value;
        });
      });
    }

    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table]?.findIndex((row) => row.id === id);

    if (rowIndex === -1 || rowIndex === undefined) {
      return null;
    }

    this.#database[table][rowIndex] = {
      ...this.#database[table][rowIndex],
      ...data,
    };

    this.#persist();
    return this.#database[table][rowIndex];
  }
  delete(table, id) {
    const rowIndex = this.#database[table]?.findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}
