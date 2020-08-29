<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="ts-logo" width="60"/>
  +
  <img src="https://image.flaticon.com/icons/svg/2165/2165022.svg" alt="api-logo" width="60" />
</p>
<h1 align="center">
    Server Test
</h1>
<p align="center">
This is a test server that creates and login users, connected to mongoDB + JWT to validate sessions.

</p>

<br />

<p align="center">
<img src="https://img.shields.io/badge/Code-Typescript-informational?style=flat&logo=typescript&logoColor=white&color=2bbc8a)" alt="image" />
<img src="https://img.shields.io/badge/Tools-Yarn-informational?style=flat&logo=yarn&logoColor=white&color=2bbc8a)" alt="image" />
<img src="https://img.shields.io/badge/Tools-Heroku-informational?style=flat&logo=heroku&logoColor=white&color=2bbc8a)" alt="image" />
<img src="https://img.shields.io/badge/Tools-MongoDB-informational?style=flat&logo=mongodb&logoColor=white&color=2bbc8a)" alt="image" />

</p>

---

## Instalation

1. Clone the project
2. Enter the project directory
3. Run **npm install** or **yarn install**

---

## Usage

- ### Endpoints

  - #### Health

    <details>
    <summary>Details</summary>

    - **URL**
      <https://lucasfonte-server-test.herokuapp.com/health>

    - **Method:**
      `GET`

    - **Headers:**
      `x-api-key: <app_x_api_key>`

    - **Response:**

      ```json
      {
        "health": true
      }
      ```

    </details>

  - #### Users/SignIn

    <details>
    <summary>Details</summary>

    - **URL**
      <https://lucasfonte-server-test.herokuapp.com/users/signIn>

    - **Method:**
      `POST`

    - **Headers:**
      `x-api-key: <app_x_api_key>`

    - **Request:**

      ```json
      {
          "email": <email_string> *[required]*,
          "password": <password_string> *[required]*
      }
      ```

      - **Response:**

      ```json
      {
      "user": {
        "id": <user_id>,
        "name": <user_name>,
        "email": <user_email>,
      },
      "token": <session_token>
      }
      ```

    </details>

  - #### Users/SignUp

    <details>
    <summary>Details</summary>

    - **URL**
      <https://lucasfonte-server-test.herokuapp.com/users/signUp>

    - **Method:**
      `POST`

    - **Headers:**
      `x-api-key: <app_x_api_key>`

    - **Request:**

    ```json
    {
        "name": <name_string> *[required]*,
        "email": <email_string> *[required]*,
        "password": <password_string> *[required]*,
        "phones": [
            {
            "phone_number": <phone_number_integer>,
            "ddd": <ddd_integer>
            }
        ] *[optional]*
    }
    ```

    - **Response:**

    ```json
    {
        "id": <user_id>,
        "name": <user_name>,
        "email": <user_email>,
        "token": <session_token>
    }
    ```

    </details>

  - #### Users/Search

    <details>
    <summary>Details</summary>

    - **URL**
      <https://lucasfonte-server-test.herokuapp.com/users/{userId}>

    - **Method:**
      `GET`

    - **Headers:**
      `x-api-key: <app_x_api_key>`
      `authorization: Bearer <user_token>`

    - **Response:**

    ```json
    {
        "user": {
            "id": <user_id>,
            "name": <user_name>,
            "email": <user_email>,
        },
    }
    ```

    </details>
