# CICD-Aazure-Func-Jenkins-8901001

# Azure Function App CI/CD with Jenkins

This README describes the complete A-to-Z process of setting up a CI/CD pipeline for an Azure Function App using Jenkins, including deployment and testing.

---

## 📁 Project Structure

```
hello-function-app/
├── HttpHelloWorld/
│   ├── function.json
│   └── index.js
├── __tests__/
│   └── hello.test.js
├── host.json
├── package.json
├── jest.config.js
└── function.zip (generated)
```

---

## ✅ Prerequisites

- Azure Subscription
- Azure CLI installed and logged in
- Jenkins installed on Windows
- Git installed on Jenkins host
- Azure Function App created on Azure
- Azure Service Principal created and credentials noted

---

## 🔑 Azure Service Principal Creation

```
az ad sp create-for-rbac --name "jenkins-app" --role contributor --scopes /subscriptions/<SUBSCRIPTION_ID>
```

Save:
- clientId
- clientSecret
- tenantId
- subscriptionId

---

## 🔧 Jenkins Configuration

### 1. Install Required Plugins

- Pipeline
- Git
- NodeJS

### 2. Create Pipeline Job

- Use GitHub repo: `https://github.com/Denny0404/CICD-Aazure-Func-Jenkins-8901001.git`

### 3. Jenkinsfile

A sample `Jenkinsfile` is already in the repo. It performs:

- Checkout code
- Install Node.js dependencies (`npm install`)
- Run tests (`npm test` with Jest)
- Package function and deploy via Azure CLI

---

## 🧪 Unit Testing

```bash
npm install
npm test
```

Tests located in `__tests__/hello.test.js`.

---

## 📦 Packaging Function

Jenkins step:
```bat
mkdir publish
copy host.json publish\
xcopy HttpHelloWorld publish\HttpHelloWorld\ /E /I /Y
powershell -Command "Compress-Archive -Path publish\* -DestinationPath function.zip -Force"
```

---

## 🚀 Deployment to Azure Function

```bash
az login --service-principal -u <clientId> -p <clientSecret> --tenant <tenantId>

az functionapp deployment source config-zip   --resource-group azure-func-resource-rg   --name my-function-app-denish   --src function.zip
```

---

## 🌐 Access Function URL

Run this to get function URL:
```bash
az functionapp function keys list   --name my-function-app-denish   --resource-group azure-func-resource-rg   --function-name HttpHelloWorld
```

Then call your API like:
```
https://my-function-app-denish-xyz.canadacentral-01.azurewebsites.net/api/HttpHelloWorld?name=Denish&code=<key>
```

---

## ✅ Sample CURL Request

```bash
curl "https://my-function-app-denish-xyz.canadacentral-01.azurewebsites.net/api/HttpHelloWorld?name=Denish&code=<key>"
```

---

## 🔁 Full Jenkins Console Output - Stages

1. Checkout SCM
2. Build with `npm install`
3. Run Jest Tests
4. Archive Azure function
5. Deploy with `az functionapp deployment`
6. Validate success (check portal logs or API endpoint)

---

## 🧼 Common Errors

- `function.zip already exists`: use `-Force` in Compress-Archive
- Test failures: Make sure `HttpHelloWorld/index.js` returns the right string
- Azure login failed: Validate Service Principal creds
- URL returns 404: Check deployment success and correct endpoint path

---

## 👨‍💻 Author

Denish Akbari – 8947486 – CI/CD Azure Function Jenkins Project
