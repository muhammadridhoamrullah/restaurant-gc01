[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15153276&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

List of available endpoints:
post /cuisines
get /cuisines

get /cuisines/pub
get /cuisines/:id/pub

get /cuisines/:id

put /cuisines/:id

delete /cuisines/:id

post /categories

get /categories

put /categories/:id

delete /categories/:id

1. POST /cuisines
   Request:

body:

{
"name" : "string",
"description": "string",
"price": "integer",
"imgUrl": "string",
"categoryId": "integer",
"authorId": "integer"
}

Response: (201 - Created)

{

"id": "integer",
"name": "string",
"description": "string",
"price": "integer",
"imgUrl": "string",
"categoryId": "integer",
"authorId": "integer",
"updatedAt": "date",
"createdAt": "date"

}

Response: (400 - Bad Request)

{

    "errors": [
        "Name harus diisi!",
        "Description harus diisi!",
        "Price harus diisi!",
        "imgUrl harus diisi!",
        "Category ID harus diisi!",
        "Author ID harus diisi!"
    ]

}
