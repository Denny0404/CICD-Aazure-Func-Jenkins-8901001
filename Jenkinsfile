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
            mkdir publish
            copy host.json publish\\
            xcopy HttpHelloWorld publish\\HttpHelloWorld\\ /E /I /Y
            powershell -Command "Compress-Archive -Path publish\\* -DestinationPath function.zip"
            '''
        }
    }
}
  }
}