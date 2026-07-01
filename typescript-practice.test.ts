// TypeScript Practice Test File
// Run this file with a TypeScript-aware runner or compile it with tsc.

interface Person {
  id: number;
  name: string;
  email?: string;
  status: UserStatus;
}

enum UserStatus {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
}

type UserFilter = {
  status?: UserStatus;
  search?: string;
};

function formatUserDisplay(user: Person): string {
  return `${user.name} (${user.status})`;
}

function filterUsers(users: Person[], filter: UserFilter): Person[] {
  return users.filter((user) => {
    const matchesStatus = filter.status ? user.status === filter.status : true;
    const matchesSearch = filter.search
      ? user.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        (user.email ?? "").toLowerCase().includes(filter.search.toLowerCase())
      : true;
    return matchesStatus && matchesSearch;
  });
}

function sumValues(numbers: readonly number[]): number {
  return numbers.reduce((sum, value) => sum + value, 0);
}

function firstOrNull<T>(items: T[]): T | null {
  return items.length > 0 ? items[0] : null;
}

function mergeObjects<A, B>(a: A, b: B): A & B {
  return { ...a, ...b };
}

function groupUsersByStatus(users: Person[]): Record<UserStatus, Person[]> {
  return {
    [UserStatus.Active]: users.filter(
      (user) => user.status === UserStatus.Active,
    ),
    [UserStatus.Inactive]: users.filter(
      (user) => user.status === UserStatus.Inactive,
    ),
    [UserStatus.Pending]: users.filter(
      (user) => user.status === UserStatus.Pending,
    ),
  };
}

function isPerson(value: unknown): value is Person {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof (value as any).id === "number" &&
    "name" in value &&
    typeof (value as any).name === "string" &&
    "status" in value &&
    Object.values(UserStatus).includes((value as any).status)
  );
}

function createUser(
  id: number,
  name: string,
  status: UserStatus,
  email?: string,
): Person {
  return { id, name, status, email };
}

function runTests() {
  const users: Person[] = [
    createUser(1, "Alice", UserStatus.Active, "alice@example.com"),
    createUser(2, "Bob", UserStatus.Pending),
    createUser(3, "Carol", UserStatus.Inactive, "carol@example.com"),
  ];

  console.assert(
    formatUserDisplay(users[0]) === "Alice (active)",
    "formatUserDisplay should include name and status",
  );
  console.assert(
    filterUsers(users, { status: UserStatus.Active }).length === 1,
    "filterUsers should return only active users",
  );
  console.assert(
    filterUsers(users, { search: "bob" }).length === 1,
    "filterUsers should search by name",
  );
  console.assert(
    filterUsers(users, { search: "example" }).length === 2,
    "filterUsers should search by email too",
  );
  console.assert(
    sumValues([1, 2, 3, 4]) === 10,
    "sumValues should add numbers correctly",
  );
  console.assert(
    firstOrNull(users)?.name === "Alice",
    "firstOrNull should return first item or null",
  );
  console.assert(
    firstOrNull([]) === null,
    "firstOrNull should return null for empty arrays",
  );

  const merged = mergeObjects({ a: 1 }, { b: "test" });
  console.assert(
    merged.a === 1 && merged.b === "test",
    "mergeObjects should combine object fields",
  );

  const grouped = groupUsersByStatus(users);
  console.assert(
    grouped[UserStatus.Active].length === 1 &&
      grouped[UserStatus.Active][0].name === "Alice",
    "groupUsersByStatus should group active users",
  );
  console.assert(
    grouped[UserStatus.Pending].length === 1 &&
      grouped[UserStatus.Pending][0].name === "Bob",
    "groupUsersByStatus should group pending users",
  );
  console.assert(
    grouped[UserStatus.Inactive].length === 1 &&
      grouped[UserStatus.Inactive][0].name === "Carol",
    "groupUsersByStatus should group inactive users",
  );

  const maybePerson: unknown = {
    id: 4,
    name: "Dana",
    status: UserStatus.Active,
  };
  console.assert(
    isPerson(maybePerson),
    "isPerson should detect a valid Person object",
  );

  const notPerson: unknown = { id: "x", name: "X", status: UserStatus.Active };
  console.assert(
    !isPerson(notPerson),
    "isPerson should return false for invalid id type",
  );

  console.log("All TypeScript practice tests passed.");
}

runTests();
