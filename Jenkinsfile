// #!/usr/bin/groovy
//
// // load pipeline functions
// // Requires pipeline-github-lib plugin to load library from github
// @Library('github.com/lachie83/jenkins-pipeline@v0.1')
// def pipeline = new io.estrado.Pipeline()

pipeline {

  agent {
    kubernetes {
      //cloud 'kubernetes'
      label 'vpnaas'
      containerTemplate {
        name 'maven'
        image 'maven:3.3.9-jdk-8-alpine'
        ttyEnabled true
        command 'cat'
      }
    }
  }

  stages {
    stage('Run maven') {
      steps {
        container('maven') {
          sh 'mvn -version'
        }
      }
    }
  }

}
