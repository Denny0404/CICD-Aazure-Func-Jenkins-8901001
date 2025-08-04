pipeline {
  agent any

  environment {
    AZURE_CLIENT_ID       = credentials('azure-client-id')
    AZURE_CLIENT_SECRET   = credentials('azure-client-secret')
    AZURE_TENANT_ID       = credentials('azure-tenant-id')
    AZURE_SUBSCRIPTION_ID = credentials('azure-subscription-id')
    RESOURCE_GROUP        = 'azure-func-resource-rg'
    FUNCTION_APP_NAME     = 'my-function-app-denish'
  }
  
  stages {
    stage('Build') {
      steps {
        echo 'Installing dependencies...'
        dir('hello-function-app') {
          bat 'npm install'
        }
      }
    }

    stage('Test') {
      steps {
        echo 'Running tests...'
        dir('hello-function-app') {
          bat 'npm test'
        }
      }
    }

    stage('Deploy') {
    steps {
        echo 'Deploying to Azure Function App...'
        dir('hello-function-app') {
            bat '''
            if exist function.zip del function.zip
            powershell -Command "Compress-Archive -Path * -DestinationPath function.zip"
            az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
            az functionapp deployment source config-zip --resource-group %AZURE_RG% --name %AZURE_FUNCTION_APP% --src function.zip
            '''
        }
    }
}
  }
}