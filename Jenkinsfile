pipeline {
    agent { label 'taas-swarm-lon02' }
    stages {

      /* ------------------------------------------------- */
        stage("Build") {
            agent { docker { image 'jonbaldie/yarn:latest' } }
            steps {
              sh 'yarn'
             }
        }

      /* ------------------------------------------------- */
        stage("Test") {
            agent { docker { image 'jonbaldie/yarn:latest' } }
            steps {
              sh 'yarn test'
             }
        }

    }
}
