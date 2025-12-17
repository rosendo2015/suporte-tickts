import { routes } from "../routes/index.js";

export function routeHandler(request, response) {
  const route = routes.find((route) => {
    return route.path === request.url && route.method === request.method;
  });

  if (route) {
    return route.controller({request, response});
  }
  return response.writeHead(404).end("Not Found");
}
