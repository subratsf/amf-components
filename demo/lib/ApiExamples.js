export const Raml10 = `#%RAML 1.0
---
title: Swagger Petstore
description: A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification
version: 1.0.0
mediaType: application/json
protocols:
  - HTTP
baseUri: 'http://petstore.swagger.io/api'

types:
  Pet:
    type: NewPet
    properties:
      id:
        type: integer
        format: int64
  NewPet:
    properties:
      name:
        type: string
      tag:
        type: string
        required: false
  Error:
    properties:
      code:
        type: integer
        format: int32
      message:
        type: string

/pets:
  get:
    description: |
      Returns all pets from the system that the user has access to
    displayName: findPets
      description: unexpected error
      body:
        application/json:
          type: Error
    responses:
      '200':
        description: pet response
        body:
          application/json:
            type: array
            items:
              type: Pet
    queryParameters:
      tags:
        description: tags to filter by
        required: false
        type: array
        items:
          type: string
      limit:
        description: maximum number of results to return
        required: false
        type: integer
        format: int32
  post:
    description: Creates a new pet in the store.  Duplicates are allowed
    displayName: addPet
      description: unexpected error
      body:
        application/json:
          type: Error
    responses:
      '200':
        description: pet response
        body:
          application/json:
            type: Pet
    body:
      application/json:
        description: Pet to add to the store
        type: NewPet
  '/{id}':
    get:
      description: 'Returns a user based on a single ID, if the user does not have access to the pet'
      displayName: find pet by id
        description: unexpected error
        body:
          application/json:
            type: Error
      responses:
        '200':
          description: pet response
          body:
            application/json:
              type: Pet
    delete:
      description: deletes a single pet based on the ID supplied
      displayName: deletePet
        description: unexpected error
        body:
          application/json:
            type: Error
      responses:
        '204':
          description: pet deleted
    uriParameters:
      id:
        description: ID of pet to delete
        type: integer
        format: int64
`;

export const Oas20Yaml = `swagger: "2.0"
info:
  version: 1.0.0
  title: Swagger Petstore
  description: A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification
  termsOfService: http://swagger.io/terms/
  contact:
    name: Swagger API Team
    email: apiteam@swagger.io
    url: http://swagger.io
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
host: petstore.swagger.io
basePath: /api
schemes:
  - http
consumes:
  - application/json
produces:
  - application/json
paths:
  /pets:
    get:
      description: |
        Returns all pets from the system that the user has access to
      operationId: findPets
      summary: Finds pets by tag
      deprecated: true
      parameters:
        - name: tags
          in: query
          description: tags to filter by
          required: false
          type: array
          collectionFormat: csv
          items:
            type: string
        - name: limit
          in: query
          description: maximum number of results to return
          required: false
          type: integer
          format: int32
      responses:
        "200":
          description: pet response
          schema:
            type: array
            items:
              $ref: '#/definitions/Pet'
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/Error'
    post:
      description: Creates a new pet in the store.  Duplicates are allowed
      operationId: addPet
      parameters:
        - name: pet
          in: body
          description: Pet to add to the store
          required: true
          schema:
            $ref: '#/definitions/NewPet'
      responses:
        "200":
          description: pet response
          schema:
            $ref: '#/definitions/Pet'
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/Error'
  /pets/{id}:
    get:
      description: Returns a user based on a single ID, if the user does not have access to the pet
      operationId: find pet by id
      parameters:
        - name: id
          in: path
          description: ID of pet to fetch
          required: true
          type: integer
          format: int64
      responses:
        "200":
          description: pet response
          schema:
            $ref: '#/definitions/Pet'
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/Error'
    delete:
      description: deletes a single pet based on the ID supplied
      operationId: deletePet
      parameters:
        - name: id
          in: path
          description: ID of pet to delete
          required: true
          type: integer
          format: int64
      responses:
        "204":
          description: pet deleted
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/Error'
definitions:
  Pet:
    allOf:
      - $ref: '#/definitions/NewPet'
      - $ref: '#/definitions/Error'
      - required:
        - id
        properties:
          id:
            type: integer
            format: int64
          test:
            type: string

  NewPet:
    required:
      - name
    properties:
      name:
        type: string
      tag:
        type: string

  Error:
    required:
      - code
      - message
    properties:
      code:
        type: integer
        format: int32
      message:
        type: string
`;

export const Oas20Json = `
{
  "schemes": [
    "https"
  ],
  "swagger": "2.0",
  "basePath": "/",
  "definitions": {},
  "host": "httpbin.org",
  "info": {
    "contact": {
      "email": "me@kennethreitz.org",
      "url": "https://kennethreitz.org"
    },
    "description": "A simple HTTP Request & Response Service.<br/> <br/> <b>Run locally: </b> <code>$ docker run -p 80:80 kennethreitz/httpbin</code>",
    "title": "httpbin.org",
    "version": "0.9.3"
  },
  "paths": {
    "/absolute-redirect/{n}": {
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "n",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "text/html"
        ],
        "responses": {
          "302": {
            "description": "A redirection."
          }
        },
        "summary": "Absolutely 302 Redirects n times.",
        "tags": [
          "Redirects"
        ]
      }
    },
    "/anything": {
      "delete": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Anything passed in request"
          }
        },
        "summary": "Returns anything passed in request data.",
        "tags": [
          "Anything"
        ]
      },
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Anything passed in request"
          }
        },
        "summary": "Returns anything passed in request data.",
        "tags": [
          "Anything"
        ]
      },
      "patch": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Anything passed in request"
          }
        },
        "summary": "Returns anything passed in request data.",
        "tags": [
          "Anything"
        ]
      },
      "post": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Anything passed in request"
          }
        },
        "summary": "Returns anything passed in request data.",
        "tags": [
          "Anything"
        ]
      },
      "put": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Anything passed in request"
          }
        },
        "summary": "Returns anything passed in request data.",
        "tags": [
          "Anything"
        ]
      },
      "trace": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Anything passed in request"
          }
        },
        "summary": "Returns anything passed in request data.",
        "tags": [
          "Anything"
        ]
      }
    },
    "/anything/{anything}": {
      "delete": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Anything passed in request"
          }
        },
        "summary": "Returns anything passed in request data.",
        "tags": [
          "Anything"
        ]
      },
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Anything passed in request"
          }
        },
        "summary": "Returns anything passed in request data.",
        "tags": [
          "Anything"
        ]
      },
      "patch": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Anything passed in request"
          }
        },
        "summary": "Returns anything passed in request data.",
        "tags": [
          "Anything"
        ]
      },
      "post": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Anything passed in request"
          }
        },
        "summary": "Returns anything passed in request data.",
        "tags": [
          "Anything"
        ]
      },
      "put": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Anything passed in request"
          }
        },
        "summary": "Returns anything passed in request data.",
        "tags": [
          "Anything"
        ]
      },
      "trace": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Anything passed in request"
          }
        },
        "summary": "Returns anything passed in request data.",
        "tags": [
          "Anything"
        ]
      }
    },
    "/base64/{value}": {
      "get": {
        "parameters": [
          {
            "default": "SFRUUEJJTiBpcyBhd2Vzb21l",
            "in": "path",
            "name": "value",
            "type": "string",
            "required": true
          }
        ],
        "produces": [
          "text/html"
        ],
        "responses": {
          "200": {
            "description": "Decoded base64 content."
          }
        },
        "summary": "Decodes base64url-encoded string.",
        "tags": [
          "Dynamic data"
        ]
      }
    },
    "/basic-auth/{user}/{passwd}": {
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "user",
            "type": "string",
            "required": true
          },
          {
            "in": "path",
            "name": "passwd",
            "type": "string",
            "required": true
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Successful authentication."
          },
          "401": {
            "description": "Unsuccessful authentication."
          }
        },
        "summary": "Prompts the user for authorization using HTTP Basic Auth.",
        "tags": [
          "Auth"
        ]
      }
    },
    "/bearer": {
      "get": {
        "parameters": [
          {
            "in": "header",
            "name": "Authorization",
            "type": "string"
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Successful authentication."
          },
          "401": {
            "description": "Unsuccessful authentication."
          }
        },
        "summary": "Prompts the user for authorization using bearer authentication.",
        "tags": [
          "Auth"
        ]
      }
    },
    "/brotli": {
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Brotli-encoded data."
          }
        },
        "summary": "Returns Brotli-encoded data.",
        "tags": [
          "Response formats"
        ]
      }
    },
    "/bytes/{n}": {
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "n",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "application/octet-stream"
        ],
        "responses": {
          "200": {
            "description": "Bytes."
          }
        },
        "summary": "Returns n random bytes generated with given seed",
        "tags": [
          "Dynamic data"
        ]
      }
    },
    "/cache": {
      "get": {
        "parameters": [
          {
            "in": "header",
            "name": "If-Modified-Since",
            "type": "string"
          },
          {
            "in": "header",
            "name": "If-None-Match",
            "type": "string"
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Cached response"
          },
          "304": {
            "description": "Modified"
          }
        },
        "summary": "Returns a 304 if an If-Modified-Since header or If-None-Match is present. Returns the same as a GET otherwise.",
        "tags": [
          "Response inspection"
        ]
      }
    },
    "/cache/{value}": {
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "value",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Cache control set"
          }
        },
        "summary": "Sets a Cache-Control header for n seconds.",
        "tags": [
          "Response inspection"
        ]
      }
    },
    "/cookies": {
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Set cookies."
          }
        },
        "summary": "Returns cookie data.",
        "tags": [
          "Cookies"
        ]
      }
    },
    "/cookies/delete": {
      "get": {
        "parameters": [
          {
            "name": "freeform",
            "in": "query",
            "type": "string"
          }
        ],
        "produces": [
          "text/plain"
        ],
        "responses": {
          "200": {
            "description": "Redirect to cookie list"
          }
        },
        "summary": "Deletes cookie(s) as provided by the query string and redirects to cookie list.",
        "tags": [
          "Cookies"
        ]
      }
    },
    "/cookies/set": {
      "get": {
        "parameters": [
          {
            "name": "freeform",
            "in": "query",
            "type": "string"
          }
        ],
        "produces": [
          "text/plain"
        ],
        "responses": {
          "200": {
            "description": "Redirect to cookie list"
          }
        },
        "summary": "Sets cookie(s) as provided by the query string and redirects to cookie list.",
        "tags": [
          "Cookies"
        ]
      }
    },
    "/cookies/set/{name}/{value}": {
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "name",
            "type": "string",
            "required": true
          },
          {
            "in": "path",
            "name": "value",
            "type": "string",
            "required": true
          }
        ],
        "produces": [
          "text/plain"
        ],
        "responses": {
          "200": {
            "description": "Set cookies and redirects to cookie list."
          }
        },
        "summary": "Sets a cookie and redirects to cookie list.",
        "tags": [
          "Cookies"
        ]
      }
    },
    "/deflate": {
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Defalte-encoded data."
          }
        },
        "summary": "Returns Deflate-encoded data.",
        "tags": [
          "Response formats"
        ]
      }
    },
    "/delay/{delay}": {
      "delete": {
        "parameters": [
          {
            "in": "path",
            "name": "delay",
            "type": "integer",
            "description": "Number of seconds to wait before sending the response.",
            "required": true
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "A delayed response."
          }
        },
        "summary": "Returns a delayed response (max of 10 seconds).",
        "tags": [
          "Dynamic data"
        ]
      },
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "delay",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "A delayed response."
          }
        },
        "summary": "Returns a delayed response (max of 10 seconds).",
        "tags": [
          "Dynamic data"
        ]
      },
      "patch": {
        "parameters": [
          {
            "in": "path",
            "name": "delay",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "A delayed response."
          }
        },
        "summary": "Returns a delayed response (max of 10 seconds).",
        "tags": [
          "Dynamic data"
        ]
      },
      "post": {
        "parameters": [
          {
            "in": "path",
            "name": "delay",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "A delayed response."
          }
        },
        "summary": "Returns a delayed response (max of 10 seconds).",
        "tags": [
          "Dynamic data"
        ]
      },
      "put": {
        "parameters": [
          {
            "in": "path",
            "name": "delay",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "A delayed response."
          }
        },
        "summary": "Returns a delayed response (max of 10 seconds).",
        "tags": [
          "Dynamic data"
        ]
      },
      "trace": {
        "parameters": [
          {
            "in": "path",
            "name": "delay",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "A delayed response."
          }
        },
        "summary": "Returns a delayed response (max of 10 seconds).",
        "tags": [
          "Dynamic data"
        ]
      }
    },
    "/delete": {
      "delete": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "The request's DELETE parameters."
          }
        },
        "summary": "The request's DELETE parameters.",
        "tags": [
          "HTTP Methods"
        ]
      }
    },
    "/deny": {
      "get": {
        "produces": [
          "text/plain"
        ],
        "responses": {
          "200": {
            "description": "Denied message"
          }
        },
        "summary": "Returns page denied by robots.txt rules.",
        "tags": [
          "Response formats"
        ]
      }
    },
    "/digest-auth/{qop}/{user}/{passwd}": {
      "get": {
        "parameters": [
          {
            "description": "auth or auth-int",
            "in": "path",
            "name": "qop",
            "type": "string",
            "required": true
          },
          {
            "in": "path",
            "name": "user",
            "type": "string",
            "required": true
          },
          {
            "in": "path",
            "name": "passwd",
            "type": "string",
            "required": true
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Successful authentication."
          },
          "401": {
            "description": "Unsuccessful authentication."
          }
        },
        "summary": "Prompts the user for authorization using Digest Auth.",
        "tags": [
          "Auth"
        ]
      }
    },
    "/digest-auth/{qop}/{user}/{passwd}/{algorithm}": {
      "get": {
        "parameters": [
          {
            "description": "auth or auth-int",
            "in": "path",
            "name": "qop",
            "type": "string",
            "required": true
          },
          {
            "in": "path",
            "name": "user",
            "type": "string",
            "required": true
          },
          {
            "in": "path",
            "name": "passwd",
            "type": "string",
            "required": true
          },
          {
            "default": "MD5",
            "description": "MD5, SHA-256, SHA-512",
            "in": "path",
            "name": "algorithm",
            "type": "string",
            "required": true
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Successful authentication."
          },
          "401": {
            "description": "Unsuccessful authentication."
          }
        },
        "summary": "Prompts the user for authorization using Digest Auth + Algorithm.",
        "tags": [
          "Auth"
        ]
      }
    },
    "/digest-auth/{qop}/{user}/{passwd}/{algorithm}/{stale_after}": {
      "get": {
        "description": "allow settings the stale_after argument.\n",
        "parameters": [
          {
            "description": "auth or auth-int",
            "in": "path",
            "name": "qop",
            "type": "string",
            "required": true
          },
          {
            "in": "path",
            "name": "user",
            "type": "string",
            "required": true
          },
          {
            "in": "path",
            "name": "passwd",
            "type": "string",
            "required": true
          },
          {
            "default": "MD5",
            "description": "MD5, SHA-256, SHA-512",
            "in": "path",
            "name": "algorithm",
            "type": "string",
            "required": true
          },
          {
            "default": "never",
            "in": "path",
            "name": "stale_after",
            "type": "string",
            "required": true
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Successful authentication."
          },
          "401": {
            "description": "Unsuccessful authentication."
          }
        },
        "summary": "Prompts the user for authorization using Digest Auth + Algorithm.",
        "tags": [
          "Auth"
        ]
      }
    },
    "/drip": {
      "get": {
        "parameters": [
          {
            "default": 2,
            "description": "The amount of time (in seconds) over which to drip each byte",
            "in": "query",
            "name": "duration",
            "required": false,
            "type": "number"
          },
          {
            "default": 10,
            "description": "The number of bytes to respond with",
            "in": "query",
            "name": "numbytes",
            "required": false,
            "type": "integer"
          },
          {
            "default": 200,
            "description": "The response code that will be returned",
            "in": "query",
            "name": "code",
            "required": false,
            "type": "integer"
          },
          {
            "default": 2,
            "description": "The amount of time (in seconds) to delay before responding",
            "in": "query",
            "name": "delay",
            "required": false,
            "type": "number"
          }
        ],
        "produces": [
          "application/octet-stream"
        ],
        "responses": {
          "200": {
            "description": "A dripped response."
          }
        },
        "summary": "Drips data over a duration after an optional initial delay.",
        "tags": [
          "Dynamic data"
        ]
      }
    },
    "/encoding/utf8": {
      "get": {
        "produces": [
          "text/html"
        ],
        "responses": {
          "200": {
            "description": "Encoded UTF-8 content."
          }
        },
        "summary": "Returns a UTF-8 encoded body.",
        "tags": [
          "Response formats"
        ]
      }
    },
    "/etag/{etag}": {
      "get": {
        "parameters": [
          {
            "in": "header",
            "name": "If-None-Match",
            "type": "string"
          },
          {
            "in": "header",
            "name": "If-Match",
            "type": "string"
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Normal response"
          },
          "412": {
            "description": "match"
          }
        },
        "summary": "Assumes the resource has the given etag and responds to If-None-Match and If-Match headers appropriately.",
        "tags": [
          "Response inspection"
        ]
      }
    },
    "/get": {
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "The request's query parameters."
          }
        },
        "summary": "The request's query parameters.",
        "tags": [
          "HTTP Methods"
        ]
      }
    },
    "/gzip": {
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "GZip-encoded data."
          }
        },
        "summary": "Returns GZip-encoded data.",
        "tags": [
          "Response formats"
        ]
      }
    },
    "/headers": {
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "The request's headers."
          }
        },
        "summary": "Return the incoming request's HTTP headers.",
        "tags": [
          "Request inspection"
        ]
      }
    },
    "/hidden-basic-auth/{user}/{passwd}": {
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "user",
            "type": "string",
            "required": true
          },
          {
            "in": "path",
            "name": "passwd",
            "type": "string",
            "required": true
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Successful authentication."
          },
          "404": {
            "description": "Unsuccessful authentication."
          }
        },
        "summary": "Prompts the user for authorization using HTTP Basic Auth.",
        "tags": [
          "Auth"
        ]
      }
    },
    "/html": {
      "get": {
        "produces": [
          "text/html"
        ],
        "responses": {
          "200": {
            "description": "An HTML page."
          }
        },
        "summary": "Returns a simple HTML document.",
        "tags": [
          "Response formats"
        ]
      }
    },
    "/image": {
      "get": {
        "produces": [
          "image/webp",
          "image/svg+xml",
          "image/jpeg",
          "image/png",
          "image/*"
        ],
        "responses": {
          "200": {
            "description": "An image."
          }
        },
        "summary": "Returns a simple image of the type suggest by the Accept header.",
        "tags": [
          "Images"
        ]
      }
    },
    "/image/jpeg": {
      "get": {
        "produces": [
          "image/jpeg"
        ],
        "responses": {
          "200": {
            "description": "A JPEG image."
          }
        },
        "summary": "Returns a simple JPEG image.",
        "tags": [
          "Images"
        ]
      }
    },
    "/image/png": {
      "get": {
        "produces": [
          "image/png"
        ],
        "responses": {
          "200": {
            "description": "A PNG image."
          }
        },
        "summary": "Returns a simple PNG image.",
        "tags": [
          "Images"
        ]
      }
    },
    "/image/svg": {
      "get": {
        "produces": [
          "image/svg+xml"
        ],
        "responses": {
          "200": {
            "description": "An SVG image."
          }
        },
        "summary": "Returns a simple SVG image.",
        "tags": [
          "Images"
        ]
      }
    },
    "/image/webp": {
      "get": {
        "produces": [
          "image/webp"
        ],
        "responses": {
          "200": {
            "description": "A WEBP image."
          }
        },
        "summary": "Returns a simple WEBP image.",
        "tags": [
          "Images"
        ]
      }
    },
    "/ip": {
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "The Requester's IP Address."
          }
        },
        "summary": "Returns the requester's IP Address.",
        "tags": [
          "Request inspection"
        ]
      }
    },
    "/json": {
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "An JSON document."
          }
        },
        "summary": "Returns a simple JSON document.",
        "tags": [
          "Response formats"
        ]
      }
    },
    "/links/{n}/{offset}": {
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "n",
            "type": "integer",
            "required": true
          },
          {
            "in": "path",
            "name": "offset",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "text/html"
        ],
        "responses": {
          "200": {
            "description": "HTML links."
          }
        },
        "summary": "Generate a page containing n links to other pages which do the same.",
        "tags": [
          "Dynamic data"
        ]
      }
    },
    "/patch": {
      "patch": {
        "parameters": [
          {
            "in": "body",
            "schema": {
              "type": "object"
            },
            "name": "body"
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "The request's PATCH parameters."
          }
        },
        "summary": "The request's PATCH parameters.",
        "tags": [
          "HTTP Methods"
        ]
      }
    },
    "/post": {
      "post": {
        "parameters": [
          {
            "in": "body",
            "schema": {
              "type": "object"
            },
            "name": "body"
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "The request's POST parameters."
          }
        },
        "summary": "The request's POST parameters.",
        "tags": [
          "HTTP Methods"
        ]
      }
    },
    "/put": {
      "put": {
        "parameters": [
          {
            "in": "body",
            "schema": {
              "type": "object"
            },
            "name": "body"
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "The request's PUT parameters."
          }
        },
        "summary": "The request's PUT parameters.",
        "tags": [
          "HTTP Methods"
        ]
      }
    },
    "/range/{numbytes}": {
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "numbytes",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "application/octet-stream"
        ],
        "responses": {
          "200": {
            "description": "Bytes."
          }
        },
        "summary": "Streams n random bytes generated with given seed, at given chunk size per packet.",
        "tags": [
          "Dynamic data"
        ]
      }
    },
    "/redirect-to": {
      "delete": {
        "produces": [
          "text/html"
        ],
        "responses": {
          "302": {
            "description": "A redirection."
          }
        },
        "summary": "302/3XX Redirects to the given URL.",
        "tags": [
          "Redirects"
        ]
      },
      "get": {
        "parameters": [
          {
            "in": "query",
            "name": "url",
            "required": true,
            "type": "string"
          },
          {
            "in": "query",
            "name": "status_code",
            "type": "integer"
          }
        ],
        "produces": [
          "text/html"
        ],
        "responses": {
          "302": {
            "description": "A redirection."
          }
        },
        "summary": "302/3XX Redirects to the given URL.",
        "tags": [
          "Redirects"
        ]
      },
      "patch": {
        "produces": [
          "text/html"
        ],
        "responses": {
          "302": {
            "description": "A redirection."
          }
        },
        "summary": "302/3XX Redirects to the given URL.",
        "tags": [
          "Redirects"
        ]
      },
      "post": {
        "parameters": [
          {
            "in": "formData",
            "name": "url",
            "required": true,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "status_code",
            "required": false,
            "type": "integer"
          }
        ],
        "produces": [
          "text/html"
        ],
        "responses": {
          "302": {
            "description": "A redirection."
          }
        },
        "summary": "302/3XX Redirects to the given URL.",
        "tags": [
          "Redirects"
        ]
      },
      "put": {
        "parameters": [
          {
            "in": "formData",
            "name": "url",
            "required": true,
            "type": "string"
          },
          {
            "in": "formData",
            "name": "status_code",
            "required": false,
            "type": "integer"
          }
        ],
        "produces": [
          "text/html"
        ],
        "responses": {
          "302": {
            "description": "A redirection."
          }
        },
        "summary": "302/3XX Redirects to the given URL.",
        "tags": [
          "Redirects"
        ]
      },
      "trace": {
        "produces": [
          "text/html"
        ],
        "responses": {
          "302": {
            "description": "A redirection."
          }
        },
        "summary": "302/3XX Redirects to the given URL.",
        "tags": [
          "Redirects"
        ]
      }
    },
    "/redirect/{n}": {
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "n",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "text/html"
        ],
        "responses": {
          "302": {
            "description": "A redirection."
          }
        },
        "summary": "302 Redirects n times.",
        "tags": [
          "Redirects"
        ]
      }
    },
    "/relative-redirect/{n}": {
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "n",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "text/html"
        ],
        "responses": {
          "302": {
            "description": "A redirection."
          }
        },
        "summary": "Relatively 302 Redirects n times.",
        "tags": [
          "Redirects"
        ]
      }
    },
    "/response-headers": {
      "get": {
        "parameters": [
          {
            "in": "query",
            "name": "freeform",
            "type": "string"
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Response headers"
          }
        },
        "summary": "Returns a set of response headers from the query string.",
        "tags": [
          "Response inspection"
        ]
      },
      "post": {
        "parameters": [
          {
            "in": "query",
            "name": "freeform",
            "type": "string"
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Response headers"
          }
        },
        "summary": "Returns a set of response headers from the query string.",
        "tags": [
          "Response inspection"
        ]
      }
    },
    "/robots.txt": {
      "get": {
        "produces": [
          "text/plain"
        ],
        "responses": {
          "200": {
            "description": "Robots file"
          }
        },
        "summary": "Returns some robots.txt rules.",
        "tags": [
          "Response formats"
        ]
      }
    },
    "/status/{codes}": {
      "delete": {
        "parameters": [
          {
            "in": "path",
            "name": "codes",
            "required": true,
            "type": "number"
          }
        ],
        "produces": [
          "text/plain"
        ],
        "responses": {
          "100": {
            "description": "Informational responses"
          },
          "200": {
            "description": "Success"
          },
          "300": {
            "description": "Redirection"
          },
          "400": {
            "description": "Client Errors"
          },
          "500": {
            "description": "Server Errors"
          }
        },
        "summary": "Return status code or random status code if more than one are given",
        "tags": [
          "Status codes"
        ]
      },
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "codes",
            "required": true,
            "type": "number"
          }
        ],
        "produces": [
          "text/plain"
        ],
        "responses": {
          "100": {
            "description": "Informational responses"
          },
          "200": {
            "description": "Success"
          },
          "300": {
            "description": "Redirection"
          },
          "400": {
            "description": "Client Errors"
          },
          "500": {
            "description": "Server Errors"
          }
        },
        "summary": "Return status code or random status code if more than one are given",
        "tags": [
          "Status codes"
        ]
      },
      "patch": {
        "parameters": [
          {
            "in": "path",
            "name": "codes",
            "required": true,
            "type": "number"
          }
        ],
        "produces": [
          "text/plain"
        ],
        "responses": {
          "100": {
            "description": "Informational responses"
          },
          "200": {
            "description": "Success"
          },
          "300": {
            "description": "Redirection"
          },
          "400": {
            "description": "Client Errors"
          },
          "500": {
            "description": "Server Errors"
          }
        },
        "summary": "Return status code or random status code if more than one are given",
        "tags": [
          "Status codes"
        ]
      },
      "post": {
        "parameters": [
          {
            "in": "path",
            "name": "codes",
            "required": true,
            "type": "number"
          }
        ],
        "produces": [
          "text/plain"
        ],
        "responses": {
          "100": {
            "description": "Informational responses"
          },
          "200": {
            "description": "Success"
          },
          "300": {
            "description": "Redirection"
          },
          "400": {
            "description": "Client Errors"
          },
          "500": {
            "description": "Server Errors"
          }
        },
        "summary": "Return status code or random status code if more than one are given",
        "tags": [
          "Status codes"
        ]
      },
      "put": {
        "parameters": [
          {
            "in": "path",
            "name": "codes",
            "required": true,
            "type": "number"
          }
        ],
        "produces": [
          "text/plain"
        ],
        "responses": {
          "100": {
            "description": "Informational responses"
          },
          "200": {
            "description": "Success"
          },
          "300": {
            "description": "Redirection"
          },
          "400": {
            "description": "Client Errors"
          },
          "500": {
            "description": "Server Errors"
          }
        },
        "summary": "Return status code or random status code if more than one are given",
        "tags": [
          "Status codes"
        ]
      },
      "trace": {
        "parameters": [
          {
            "in": "path",
            "name": "codes",
            "required": true,
            "type": "number"
          }
        ],
        "produces": [
          "text/plain"
        ],
        "responses": {
          "100": {
            "description": "Informational responses"
          },
          "200": {
            "description": "Success"
          },
          "300": {
            "description": "Redirection"
          },
          "400": {
            "description": "Client Errors"
          },
          "500": {
            "description": "Server Errors"
          }
        },
        "summary": "Return status code or random status code if more than one are given",
        "tags": [
          "Status codes"
        ]
      }
    },
    "/stream-bytes/{n}": {
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "n",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "application/octet-stream"
        ],
        "responses": {
          "200": {
            "description": "Bytes."
          }
        },
        "summary": "Streams n random bytes generated with given seed, at given chunk size per packet.",
        "tags": [
          "Dynamic data"
        ]
      }
    },
    "/stream/{n}": {
      "get": {
        "parameters": [
          {
            "in": "path",
            "name": "n",
            "type": "integer",
            "required": true
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Streamed JSON responses."
          }
        },
        "summary": "Stream n JSON responses",
        "tags": [
          "Dynamic data"
        ]
      }
    },
    "/user-agent": {
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "The request's User-Agent header."
          }
        },
        "summary": "Return the incoming requests's User-Agent header.",
        "tags": [
          "Request inspection"
        ]
      }
    },
    "/uuid": {
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "A UUID4."
          }
        },
        "summary": "Return a UUID4.",
        "tags": [
          "Dynamic data"
        ]
      }
    },
    "/xml": {
      "get": {
        "produces": [
          "application/xml"
        ],
        "responses": {
          "200": {
            "description": "An XML document."
          }
        },
        "summary": "Returns a simple XML document.",
        "tags": [
          "Response formats"
        ]
      }
    }
  },
  "tags": [
    {
      "description": "Testing different HTTP verbs",
      "name": "HTTP Methods"
    },
    {
      "description": "Auth methods",
      "name": "Auth"
    },
    {
      "description": "Generates responses with given status code",
      "name": "Status codes"
    },
    {
      "description": "Inspect the request data",
      "name": "Request inspection"
    },
    {
      "description": "Inspect the response data like caching and headers",
      "name": "Response inspection"
    },
    {
      "description": "Returns responses in different data formats",
      "name": "Response formats"
    },
    {
      "description": "Generates random and dynamic data",
      "name": "Dynamic data"
    },
    {
      "description": "Creates, reads and deletes Cookies",
      "name": "Cookies"
    },
    {
      "description": "Returns different image formats",
      "name": "Images"
    },
    {
      "description": "Returns different redirect responses",
      "name": "Redirects"
    },
    {
      "description": "Returns anything that is passed to request",
      "name": "Anything"
    }
  ]
}
`;

export const Oas30Yaml = `
openapi: 3.0.2
servers:
  - url: /v3
info:
  description: |-
    This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about
    Swagger at [http://swagger.io](http://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!
    You can now help us improve the API whether it's by making changes to the definition itself or to the code.
    That way, with time, we can improve the API in general, and expose some of the new features in OAS3.

    Some useful links:
    - [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)
    - [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)
  version: 1.0.6-SNAPSHOT
  title: Swagger Petstore - OpenAPI 3.0
  termsOfService: 'http://swagger.io/terms/'
  contact:
    email: apiteam@swagger.io
    name: Swagger IO
    url: swagger.io
  license:
    name: Apache 2.0
    url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
tags:
  - name: pet
    description: Everything about your Pets
    externalDocs:
      description: Find out more
      url: 'http://swagger.io'
  - name: store
    description: Operations about user
  - name: user
    description: Access to Petstore orders
    externalDocs:
      description: Find out more about our store
      url: 'http://swagger.io'
paths:
  /pet:
    post:
      tags:
        - pet
      summary: Add a new pet to the store
      description: Add a new pet to the store
      operationId: addPet
      deprecated: true
      responses:
        '200':
          description: Successful operation
          content:
            application/xml:
              schema:
                $ref: '#/components/schemas/Pet'
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
        '405':
          description: Invalid input
      security:
        - petstore_auth:
            - 'write:pets'
            - 'read:pets'
      requestBody:
        description: Create a new pet in the store
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Pet'
          application/xml:
            schema:
              $ref: '#/components/schemas/Pet'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/Pet'
    put:
      tags:
        - pet
      summary: Update an existing pet
      description: Update an existing pet by Id
      operationId: updatePet
      responses:
        '200':
          description: Successful operation
          content:
            application/xml:
              schema:
                $ref: '#/components/schemas/Pet'
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
        '400':
          description: Invalid ID supplied
        '404':
          description: Pet not found
        '405':
          description: Validation exception
      security:
        - petstore_auth:
            - 'write:pets'
            - 'read:pets'
      requestBody:
        description: Update an existent pet in the store
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Pet'
          application/xml:
            schema:
              $ref: '#/components/schemas/Pet'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/Pet'
  /pet/findByStatus:
    get:
      tags:
        - pet
      summary: Finds Pets by status
      description: Multiple status values can be provided with comma separated strings
      operationId: findPetsByStatus
      parameters:
        - name: status
          in: query
          description: Status values that need to be considered for filter
          required: false
          explode: true
          example: pending
          schema:
            type: string
            enum:
              - available
              - pending
              - sold
            default: available
      responses:
        '200':
          description: successful operation
          content:
            application/xml:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Pet'
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Pet'
        '400':
          description: Invalid status value
      security:
        - petstore_auth:
            - 'write:pets'
            - 'read:pets'
  /pet/findByTags:
    get:
      tags:
        - pet
      summary: Finds Pets by tags
      description: >-
        Multiple tags can be provided with comma separated strings. Use tag1,
        tag2, tag3 for testing.
      operationId: findPetsByTags
      parameters:
        - name: tags
          in: query
          description: Tags to filter by
          required: false
          explode: true
          schema:
            type: array
            items:
              type: string
      responses:
        '200':
          description: successful operation
          content:
            application/xml:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Pet'
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Pet'
        '400':
          description: Invalid tag value
      security:
        - petstore_auth:
            - 'write:pets'
            - 'read:pets'
  '/pet/{petId}':
    get:
      tags:
        - pet
      summary: Find pet by ID
      description: Returns a single pet
      operationId: getPetById
      parameters:
        - name: petId
          in: path
          description: ID of pet to return
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: successful operation
          content:
            application/xml:
              schema:
                $ref: '#/components/schemas/Pet'
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
        '400':
          description: Invalid ID supplied
        '404':
          description: Pet not found
      security:
        - api_key: []
        - petstore_auth:
            - 'write:pets'
            - 'read:pets'
    post:
      tags:
        - pet
      summary: Updates a pet in the store with form data
      description: ''
      operationId: updatePetWithForm
      parameters:
        - name: petId
          in: path
          description: ID of pet that needs to be updated
          required: true
          schema:
            type: integer
            format: int64
        - name: name
          in: query
          description: Name of pet that needs to be updated
          deprecated: true
          explode: true
          allowEmptyValue: true
          allowReserved: true
          required: false
          style: form
          example: "A name"
          schema:
            type: string
        - name: status
          in: query
          description: Status of pet that needs to be updated
          schema:
            type: string
        - name: debug
          in: cookie
          description: Whether to debug the response
          schema:
            type: number
        - in: query
          name: filter
          content:
            application/json:
              schema:
                type: object
                properties:
                  type:
                    type: string
                  color:
                    type: string
      responses:
        '405':
          description: Invalid input
      security:
        - petstore_auth:
            - 'write:pets'
            - 'read:pets'
    delete:
      tags:
        - pet
      summary: Deletes a pet
      description: ''
      operationId: deletePet
      parameters:
        - name: api_key
          in: header
          description: ''
          required: false
          schema:
            type: string
        - name: petId
          in: path
          description: Pet id to delete
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '400':
          description: Invalid pet value
      security:
        - petstore_auth:
            - 'write:pets'
            - 'read:pets'
  '/pet/{petId}/uploadImage':
    post:
      tags:
        - pet
      summary: uploads an image
      description: ''
      operationId: uploadFile
      parameters:
        - name: petId
          in: path
          description: ID of pet to update
          required: true
          schema:
            type: integer
            format: int64
        - name: additionalMetadata
          in: query
          description: Additional Metadata
          required: false
          schema:
            type: string
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiResponse'
      security:
        - petstore_auth:
            - 'write:pets'
            - 'read:pets'
      requestBody:
        content:
          application/octet-stream:
            schema:
              type: string
              format: binary
  /pet/listDogs:
    get:
      tags:
        - pet
      summary: List dogs only
      description: An endpoint to list pets that are dogs.
      operationId: listDogs
      responses:
        '200':
          description: |
            A response that returns a paginated object listing all dogs in the store.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Dog'
  /pet/listCommon:
    get:
      tags:
        - pet
      summary: List common
      description: An endpoint to list dogs, cats, and lizards.
      operationId: listCommon
      responses:
        '200':
          description: |
            A response that returns a paginated object listing all common pets in the store.
          content:
            application/json:
              schema:
                type: array
                items:
                  anyOf:
                    - $ref: '#/components/schemas/Dog'
                    - $ref: '#/components/schemas/Cat'
                    - $ref: '#/components/schemas/Lizard'
              
  /store/inventory:
    get:
      tags:
        - store
      summary: Returns pet inventories by status
      description: Returns a map of status codes to quantities
      operationId: getInventory
      x-swagger-router-controller: OrderController
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: object
                additionalProperties:
                  type: integer
                  format: int32
      security:
        - api_key: []
  /store/order:
    post:
      tags:
        - store
      summary: Place an order for a pet
      description: Place a new order in the store
      operationId: placeOrder
      x-swagger-router-controller: OrderController
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Order'
        '405':
          description: Invalid input
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Order'
          application/xml:
            schema:
              $ref: '#/components/schemas/Order'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/Order'
  '/store/order/{orderId}':
    get:
      tags:
        - store
      summary: Find purchase order by ID
      x-swagger-router-controller: OrderController
      description: >-
        For valid response try integer IDs with value <= 5 or > 10. Other values
        will generated exceptions
      operationId: getOrderById
      parameters:
        - name: orderId
          in: path
          description: ID of order that needs to be fetched
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: successful operation
          content:
            application/xml:
              schema:
                $ref: '#/components/schemas/Order'
            application/json:
              schema:
                $ref: '#/components/schemas/Order'
        '400':
          description: Invalid ID supplied
        '404':
          description: Order not found
    delete:
      tags:
        - store
      summary: Delete purchase order by ID
      x-swagger-router-controller: OrderController
      description: >-
        For valid response try integer IDs with value < 1000. Anything above
        1000 or nonintegers will generate API errors
      operationId: deleteOrder
      parameters:
        - name: orderId
          in: path
          description: ID of the order that needs to be deleted
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '400':
          description: Invalid ID supplied
        '404':
          description: Order not found
  /user:
    post:
      tags:
        - user
      summary: Create user
      description: This can only be done by the logged in user.
      operationId: createUser
      responses:
        default:
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
            application/xml:
              schema:
                $ref: '#/components/schemas/User'
          links:
            GetUserByUserName:
              operationId: getUserByName
              parameters:
                username: '$request.body#/username'
              description: >
                The \`username\` value from the request body to be used as
                the \`username\` parameter in \`GET /users/{username}\`.
            GetUserByRef:
              operationRef: '#/paths/user/{username}/get'
              parameters:
                username: '$request.body#/username'
              description: >
                This uses \`operationRef\` instead of \`operationId\`.
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
          application/xml:
            schema:
              $ref: '#/components/schemas/User'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/User'
        description: Created user object
  /user/createWithList:
    post:
      tags:
        - user
      summary: Creates list of users with given input array
      description: 'Creates list of users with given input array'
      x-swagger-router-controller: UserController
      operationId: createUsersWithListInput
      responses:
        '200':
          description: Successful operation
          content:
            application/xml:
              schema:
                $ref: '#/components/schemas/User'
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        default:
          description: successful operation
      requestBody:
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/User'
  /user/login:
    get:
      tags:
        - user
      summary: Logs user into the system
      description: ''
      operationId: loginUser
      parameters:
        - name: username
          in: query
          description: The user name for login
          required: false
          schema:
            type: string
        - name: password
          in: query
          description: The password for login in clear text
          required: false
          schema:
            type: string
      responses:
        '200':
          description: successful operation
          headers:
            X-Rate-Limit:
              description: calls per hour allowed by the user
              schema:
                type: integer
                format: int32
            X-Expires-After:
              description: date in UTC when token expires
              schema:
                type: string
                format: date-time
          content:
            application/xml:
              schema:
                type: string
            application/json:
              schema:
                type: string
        '400':
          description: Invalid username/password supplied
  /user/logout:
    get:
      tags:
        - user
      summary: Logs out current logged in user session
      description: ''
      operationId: logoutUser
      parameters: []
      responses:
        default:
          description: successful operation
  '/user/{username}':
    summary: Represents a user
    description: >
      This resource represents an individual user in the system.
      Each user is identified by a numeric \`id\`.
    parameters:
      - name: username
        in: path
        description: 'The name that needs to be fetched. Use user1 for testing. '
        required: true
        schema:
          type: string
    get:
      tags:
        - user
      summary: Get user by user name
      description: ''
      operationId: getUserByName
      responses:
        '200':
          description: successful operation
          content:
            application/xml:
              schema:
                $ref: '#/components/schemas/User'
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          description: Invalid username supplied
        '404':
          description: User not found
    put:
      tags:
        - user
      summary: Update user
      x-swagger-router-controller: UserController
      description: This can only be done by the logged in user.
      operationId: updateUser
      parameters:
        - name: username
          in: path
          description: name that need to be deleted
          required: true
          schema:
            type: string
      responses:
        default:
          description: successful operation
      requestBody:
        description: Update an existent user in the store
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
          application/xml:
            schema:
              $ref: '#/components/schemas/User'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/User'
    delete:
      tags:
        - user
      summary: Delete user
      description: This can only be done by the logged in user.
      operationId: deleteUser
      parameters:
        - name: username
          in: path
          description: The name that needs to be deleted
          required: true
          schema:
            type: string
      responses:
        '400':
          description: Invalid username supplied
        '404':
          description: User not found
  /unions:
    patch:
      summary: An oneOf body
      requestBody:
        content:
          application/json:
            schema:
              oneOf:
                - $ref: '#/components/schemas/Cat'
                - $ref: '#/components/schemas/Dog'
      responses:
        '200':
          description: Updated
    post:
      summary: An allOf body
      requestBody:
        content:
          application/json:
            schema:
              allOf:
                - $ref: '#/components/schemas/Cat'
                - $ref: '#/components/schemas/Dog'
              discriminator:
                propertyName: pet_type
      responses:
        '200':
          description: Updated
externalDocs:
  description: Find out more about Swagger
  url: 'http://swagger.io'
components:
  schemas:
    Order:
      x-swagger-router-model: io.swagger.petstore.model.Order
      properties:
        id:
          type: integer
          format: int64
          example: 10
        petId:
          type: integer
          format: int64
          example: 198772
        quantity:
          type: integer
          format: int32
          example: 7
        shipDate:
          type: string
          format: date-time
        status:
          type: string
          description: Order Status
          enum:
            - placed
            - approved
            - delivered
          example: approved
        complete:
          type: boolean
      xml:
        name: order
      type: object
    Customer:
      properties:
        id:
          type: integer
          format: int64
          example: 100000
        username:
          type: string
          example: fehguy
        address:
          type: array
          items:
            $ref: '#/components/schemas/Address'
          xml:
            wrapped: true
            name: addresses
      xml:
        name: customer
      type: object
    Address:
      properties:
        street:
          type: string
          example: 437 Lytton
        city:
          type: string
          example: Palo Alto
        state:
          type: string
          example: CA
        zip:
          type: string
          example: 94301
      xml:
        name: address
      type: object
    Category:
      x-swagger-router-model: io.swagger.petstore.model.Category
      properties:
        id:
          type: integer
          format: int64
          example: 1
        name:
          type: string
          example: Dogs
      xml:
        name: category
      type: object
    User:
      x-swagger-router-model: io.swagger.petstore.model.User
      properties:
        id:
          type: integer
          format: int64
          example: 10
        username:
          type: string
          example: theUser
        firstName:
          type: string
          example: John
        lastName:
          type: string
          example: James
        email:
          type: string
          example: john@email.com
        password:
          type: string
          example: 12345
        phone:
          type: string
          example: 12345
        userStatus:
          type: integer
          format: int32
          example: 1
          description: User Status
      xml:
        name: user
      type: object
    Tag:
      x-swagger-router-model: io.swagger.petstore.model.Tag
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
      xml:
        name: tag
      type: object
    Pet:
      x-swagger-router-model: io.swagger.petstore.model.Pet
      required:
        - name
        - photoUrls
      properties:
        id:
          type: integer
          format: int64
          example: 10
        name:
          type: string
          example: doggie
        category:
          $ref: '#/components/schemas/Category'
        photoUrls:
          type: array
          xml:
            wrapped: true
          items:
            type: string
            xml:
              name: photoUrl
        tags:
          type: array
          xml:
            wrapped: true
          items:
            $ref: '#/components/schemas/Tag'
            xml:
              name: tag
        status:
          type: string
          description: pet status in the store
          enum:
            - available
            - pending
            - sold
        petType:
          type: string
      discriminator:
        propertyName: petType
      xml:
        name: pet
      type: object
    ApiResponse:
      properties:
        code:
          type: integer
          format: int32
        type:
          type: string
        message:
          type: string
      xml:
        name: '##default'
      type: object
    Cat:
      allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        properties:
          name:
            type: string
    Dog:
      allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        properties:
          bark:
            type: string
    Lizard:
      allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        properties:
          lovesRocks:
            type: boolean
  requestBodies:
    Pet:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Pet'
        application/xml:
          schema:
            $ref: '#/components/schemas/Pet'
      description: Pet object that needs to be added to the store
    UserArray:
      content:
        application/json:
          schema:
            type: array
            items:
              $ref: '#/components/schemas/User'
      description: List of user object
  securitySchemes:
    petstore_auth:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: 'https://petstore.swagger.io/oauth/authorize'
          scopes:
            'write:pets': modify pets in your account
            'read:pets': read your pets
    api_key:
      type: apiKey
      name: api_key
      in: header
`;

export const Oas30Json = `
{
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "license": {
      "name": "MIT"
    }
  },
  "servers": [
    {
      "url": "http://petstore.swagger.io/v1"
    }
  ],
  "paths": {
    "/pets": {
      "get": {
        "summary": "List all pets",
        "operationId": "listPets",
        "tags": [
          "pets"
        ],
        "parameters": [
          {
            "name": "limit",
            "in": "query",
            "description": "How many items to return at one time (max 100)",
            "required": false,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "A paged array of pets",
            "headers": {
              "x-next": {
                "description": "A link to the next page of responses",
                "schema": {
                  "type": "string"
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Pets"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create a pet",
        "operationId": "createPets",
        "tags": [
          "pets"
        ],
        "responses": {
          "201": {
            "description": "Null response"
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/pets/{petId}": {
      "get": {
        "summary": "Info for a specific pet",
        "operationId": "showPetById",
        "tags": [
          "pets"
        ],
        "parameters": [
          {
            "name": "petId",
            "in": "path",
            "required": true,
            "description": "The id of the pet to retrieve",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Expected response to a valid request",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Pet"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Pet": {
        "type": "object",
        "required": [
          "id",
          "name"
        ],
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "tag": {
            "type": "string"
          }
        }
      },
      "Pets": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/Pet"
        }
      },
      "Error": {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          }
        }
      }
    }
  }
}
`;

export const Async20 = `
asyncapi: '2.0.0'
info:
  title: Streetlights API
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights API allows you
    to remotely manage the city lights.
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'
servers:
  mosquitto:
    url: mqtt://test.mosquitto.org
    protocol: mqtt
channels:
  light/measured:
    publish:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      operationId: onLightMeasured
      message:
        name: LightMeasured
        payload:
          type: object
          properties:
            id:
              type: integer
              minimum: 0
              description: Id of the streetlight.
            lumens:
              type: integer
              minimum: 0
              description: Light intensity measured in lumens.
            sentAt:
              type: string
              format: date-time
              description: Date and time when the message was sent.

`;
