const { PrismaClient } = require("@prisma/client");

const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

// Dans la function `main`, je fais un code pour créer 10 utilisateurs qui ont chacun 1 cours et 100 relations entre les cours et les utilisateurs en tant qu'élèves.

const main = async () => {
  const users: any[] = [];

  for (let i = 0; i < 10; i++) {
    users.push(
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          createdAt: faker.date.past(),
          createdCourse: {
            create: {
              name: faker.lorem.words(3),
              createdAt: faker.date.past(),
              presentation: faker.lorem.paragraph(),
              img: faker.image.url(),
              lessons: {
                createMany: {
                  data: [
                    {
                      name: faker.lorem.words(3),
                      content: faker.lorem.paragraph(),
                      rank: 1,
                    },
                    {
                      name: faker.lorem.words(3),
                      content: faker.lorem.paragraph(),
                      rank: 2,
                    },
                  ],
                },
              },
            },
          },
        },
      })
    );
  }

  // link users to courses
  const courses = await prisma.course.findMany();

  for (const course of courses) {
    const random3Users = faker.helpers.arrayElements(users, 3);

    for (const user of random3Users) {
      await prisma.courseOnUser.create({
        data: {
          userId: user.id,
          courseId: course.id,
        },
      });
    }
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });

/* // TypeScript utility type Record<K, T> creates an object type with specified properties.
// K: Type of keys in the object.
// T: Type of values associated with the keys.
const { PrismaClient } = require("@prisma/client");

type UserSeed = {
  name: string;
  email: string;
  img?: string;
};

type LessonSeed = {
  name: string;
  rank: number;
  content: string;
  courseName: string;
};

type Course = {
  id: string;
  name: string;
  presentation: string; // markdown
  img: string;
  createdAt: Date;
  creatorId: string;
};

const prisma = new PrismaClient();

/* async function seedUsers(users: UserSeed[]) {
  const createdUsers = await prisma.user.createMany({
    data: users,
  });
  return createdUsers;
} 

const seedUsers = async (users: UserSeed[]) => {
  const createdUsers = await Promise.all(
    users.map(async (user) => {
      return prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      });
    })
  );

  return createdUsers;
};

async function seedLessons(lessons: LessonSeed[]) {
  const coursesMap: Record<string, Course> = {};
  const courses: Course[] = await prisma.course.findMany();

  courses.forEach((course) => {
    coursesMap[course.name] = course;
  });

  const createdLessons = await Promise.all(
    lessons.map(async (lesson) => {
      return await prisma.lesson.create({
        data: {
          name: lesson.name,
          rank: lesson.rank,
          content: lesson.content,
          courseId: coursesMap[lesson.name].id,
        },
      });
    })
  );

  return createdLessons;
}

async function main() {
  const users: UserSeed[] = [
    { name: "Henry Charles", email: "hc@gmail.com" },
    { name: "Jean Dupont", email: "jean@gmail.com" },
    { name: "Marie Durand", email: "marie@gmail.com" },
    { name: "Pierre Martin", email: "pierre@gmail.com" },
    { name: "Sophie Lefevre", email: "sophie@gmail.com" },
  ];

  const lessons: LessonSeed[] = [
    {
      name: "Les variables",
      content: "Contenu de la leçon sur les variables",
      rank: 1,
      courseName: "BeginJavaScript",
    },
    {
      name: "Les boucles",
      content: "Contenu de la leçon sur les boucles",
      rank: 2,
      courseName: "BeginJavaScript",
    },
    {
      name: "Les fonctions",
      content: "Contenu de la leçon sur les fonctions",
      rank: 3,
      courseName: "BeginJavaScript",
    },
    {
      name: "Les objets",
      content: "Contenu de la leçon sur les objets",
      rank: 4,
      courseName: "BeginJavaScript",
    },
    {
      name: "Les tableaux",
      content: "Contenu de la leçon sur les tableaux",
      rank: 5,
      courseName: "BeginJavaScript",
    },
    {
      name: "Introduction à React",
      content: "Contenu de la leçon d'introduction à React",
      rank: 1,
      courseName: "BeginReact",
    },
    {
      name: "Les composants React",
      content: "Contenu de la leçon sur les composants React",
      rank: 2,
      courseName: "BeginReact",
    },
    {
      name: "State et Props",
      content: "Contenu de la leçon sur State et Props en React",
      rank: 3,
      courseName: "BeginReact",
    },
    {
      name: "Les hooks",
      content: "Contenu de la leçon sur les hooks en React",
      rank: 4,
      courseName: "BeginReact",
    },
    {
      name: "Les effets secondaires",
      content: "Contenu de la leçon sur les effets secondaires en React",
      rank: 5,
      courseName: "BeginReact",
    },
  ];
  const createdUsers = await seedUsers(users);
  const createdLessons = await seedLessons(lessons);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/* const createdLessons = await prisma.lesson.createMany({
    data: lessons.map((lesson) => {
      return {
        name: lesson.name,
        rank: lesson.rank,
        content: lesson.content,
        courseId:
          lesson.courseName === beginReact.name
            ? beginReact.id
            : beginJavaScript.id,
      };
    }),
  }); */
