import { routes } from "../routes/index.js";
import {Database} from "../database/database.js";

const database = new Database();

export function routeHandler(request, response) {
  const route = routes.find((route) => {
    return route.path === request.url && route.method === request.method;
  });

  if (route) {
    return route.controller({request, response, database});
  }
  return response.writeHead(404).end("Not Found");
}
