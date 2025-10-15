# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Migração para SQLite local

Este projeto foi migrado para usar SQLite local (via `expo-sqlite`) para gerenciar usuários (cadastro/login) sem depender do backend remoto.

Passos para preparar o ambiente localmente:

1. Instale dependências:

```bash
npm install
npx expo install expo-sqlite
```

2. (Opcional) Se ainda não instalado, instale `bcryptjs` (já adicionado ao package.json):

```bash
npm install
```

3. Inicie o aplicativo:

```bash
npx expo start
```

Notas:
- A tabela `usuarios` é criada automaticamente ao iniciar o app (pelo serviço `services/sqliteService.ts`).
- Se quiser reverter para o backend antigo, restaure as chamadas em `services/userService.ts`.

