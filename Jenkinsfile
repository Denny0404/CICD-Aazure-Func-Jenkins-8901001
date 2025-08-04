pipeline {
  agent any

  environment {
    AZURE_CLIENT_ID       = credentials('azure-client-id')
    AZURE_CLIENT_SECRET   = credentials('azure-client-secret')
    AZURE_TENANT_ID       = credentials('azure-tenant-id')
    AZURE_SUBSCRIPTION_ID = credentials('azure-subscription-id')
    // AZURE_CLIENT_ID       = credentials('50e7aac8-f33b-4197-8151-c3c5dc53bf91')
    // AZURE_CLIENT_SECRET   = credentials('aee31a94-438a-4986-bd0e-4a48439fcd0a')
    // AZURE_TENANT_ID       = credentials('76235ec3-a827-460f-ab4e-38ebe506ffd8')
    // AZURE_SUBSCRIPTION_ID = credentials('6d09407b-606c-49d7-8cca-7d3c9475860c')
    RESOURCE_GROUP        = 'azure-func-resource-rg'
    FUNCTION_APP_NAME     = 'my-function-app-denish'
  }

  stages {
    stage('Build') {
      steps {
        echo 'Installing dependencies...'
        bat 'npm install'
      }
    }

    stage('Test') {
      steps {
        echo 'Running tests...'
        bat 'npm test'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying to Azure...'
        bat """
          powershell -Command "Compress-Archive -Path * -DestinationPath function.zip"
          az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
          az account set --subscription %AZURE_SUBSCRIPTION_ID%
          az functionapp deployment source config-zip --resource-group %RESOURCE_GROUP% --name %FUNCTION_APP_NAME% --src function.zip
        """
      }
    }
  }
}