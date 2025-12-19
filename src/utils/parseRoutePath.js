export function parseRoutePath(path) {
  // Remove leading and trailing slashes
  const routeParameterRegex = /:([a-zA-Z]+)/g
  
  const params = path.replaceAll(routeParameterRegex, '(:<$1>)[a-z0-9-_]+');
    
  const pathRegex = new RegExp(`^${params}(?<query>\\?(.*))?$`);

  return pathRegex;  
}

  