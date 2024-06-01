[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15153276&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

List of available endpoints:

<!-- --LOGIN DAN REGISTER -->

post /register
post /login

<!-- --LOGIN DAN REGISTER -->

<!-- --PUB -->

get /cuisines/pub
get /cuisines/:id/pub

<!-- --PUB -->

<!-- --CUISINES -->

post /cuisines
get /cuisines

get /cuisines/:id
put /cuisines/:id
delete /cuisines/:id

<!-- --CUISINES -->

<!-- --CATEGORIES -->

post /categories
get /categories
put /categories/:id
delete /categories/:id

<!-- --CATEGORIES -->

<!-- --UPLOAD IMAGE -->

patch /cuisineImage/:id

<!-- --UPLOAD IMAGE -->

1. POST /register

Request:

headers:

{
"Authorization": "Bearer ${accesToken}"
}

body:

{
"email": "ridhoamrullah99@gmail.com",
"password": "1234567890",
"phoneNumber: "085363508580",
"address": "Jalan Pemuda",
"username": "ridhoamrullah"
}

Response: (201 - Created)

{
"id": 1,
"email": "ridhoamrullah99@gmail.com",
"phoneNumber: "085363508580",
"address": "Jalan Pemuda",
"username": "ridhoamrullah",
"createdAt": "2024-06-01T01:33:15.785Z",
"updatedAt": "2024-06-01T01:33:15.785Z"
}

Response( 400 - Bad Request)

{
    "errors": [
        "Email harus diisi!",
        "Email harus valid!",
        "Password harus diisi!",
        "Minamal 5 karakter",
        "Phone Number harus diisi!",
        "Address harus diisi!"
    ]
}
