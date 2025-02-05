Instalei o node.js com as seguintes dependencias: 
 bcrypt@5.1.1
├── bcryptjs@2.4.3
├── body-parser@1.20.3
├── cors@2.8.5
├── dotenv@16.4.7
├── express-session@1.18.1
├── express@4.21.2
├── jsonwebtoken@9.0.2
├── mysql2@3.12.0
└── sequelize@6.37.5

Após todas essas dependências todas instaladas para correr o programa basta colocar na linha de comandos do VisuolStudio Code "node server.js"

Para dar login com admin existe 4 possibilidades:
name: Admin1
pass: password1

name: Admin2
pass: password2

name: Admin3
pass: password3

name: admin
pass: 123456



Tenha o Node.js e o npm instalados(V.10.7.0). 
Além disso, o MySQL(V.8.0) instalado e configurado, pois o projeto utiliza MySQL com Sequelize.


Neste código contém routes que servem para o user ou o admin enviarem dados mas também os receberem como por exemplo:
-login
-visualizar os produtos
-criar, editar, remover produtos
-gestão das encomendas
-criação de encomendas

Os models servem para a estrutura de dados do projeto onde a partir deles se criam as routes. 
Neste caso eu utilizei o Sequelize para que seja possivel manipular os dados através de código e nao apenas por instruções no MySQl.

Dentro da pasta viwes tem os ficheiros HTML onde estão todas as paginas disponiveis para este site.7

O ficheiro "server.js" serve para chamar as routes e as paginas HTML, lá é onde tambem esta a conexao com o servidor e base de dados.

O ficheiro "db.js" serve para o projeto se conectar com a base de dados.