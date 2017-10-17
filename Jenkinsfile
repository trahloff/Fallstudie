pipeline {
    agent { label 'taas-swarm-lon02' }
    stages {

      /* ------------------------------------------------- */
        stage("Build") {
            agent { docker { image 'yarn:latest' } }
            steps {
              sh 'yarn'
             }
        }

      /* ------------------------------------------------- */
        stage("Test") {
            agent { docker { image 'yarn:latest' } }
            steps {
              sh 'yarn test'
             }
        }

    }
}
