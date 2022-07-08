export type StackLowercase = Lowercase<Stacks>;
export type StackUppercase = Uppercase<Stacks>;
export type StackCapitalize = Capitalize<Stacks>;

export type Stacks =
    | WebStack
    | AppStack
    | LanguageStack
    | DatabaseStack
    | InfraStack
    | ThreeDStack
    | DevTool;

export type WebStack =
    | "HTML5"
    | "CSS3"
    | "SCSS"
    | "React"
    | "Next.js"
    | "Svelte"
    | "A-frame"
    | "Django"
    | "Ruby on Rails"
    | "CodeIgniter"
    | "jQuery"
    | "REST API";

export type AppStack = "Flutter" | "React Native";

export type ThreeDStack = "Unity";

export type LanguageStack =
    | "JavaScript"
    | "TypeScript"
    | "Python"
    | "C++"
    | "C#"
    | "Ruby"
    | "PHP";

export type DatabaseStack =
    | "MySQL"
    | "GraphQL"
    | "MongoDB"
    | "SQLite"
    | "PostgreSQL"
    | "phpMyAdmin";

export type InfraStack =
    | AwsStack
    | GcpStack
    | "Git"
    | "Docker"
    | "Jenkins"
    | "Heroku";

export type AwsStack =
    | "AWS"
    | "AWS EC2"
    | "AWS S3"
    | "AWS RDS"
    | "AWS Elastic Beanstalk";

export type GcpStack = "GCP" | "GCP Compute Engine";

export type DevTool = "Storybook";
