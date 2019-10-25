### Environment
- Git
- Java
- Maven

Maven is a build automation tool used primarily for Java projects which describes how software is built and its dependencies. The backend part of this project is managed with Maven. You can click the link below to see more information and how to install it.
https://maven.apache.org/
- NPM

npm is a package manager for the JavaScript programming language. You can click the link below to see more information and how to install it.
https://www.npmjs.com/

### Packaging
Run these command in your workspace to get the packaged artefacts.

```
git clone https://bitbucket.cis.unimelb.edu.au:8445/scm/swen900142019wabilby/swen90014-2019-wa-bilby.git
cd swen90014-2019-wa-bilby/wa-backend
maven install
cd ../wa-frontend
npm run build
```

Then the runnable artefact will be saved in these directories:

```
Frontend: wa-frontend/dist
Backend: wa-backend/target
```
