"use strict";
// TypeScript Practice Test File
// Run this file with a TypeScript-aware runner or compile it with tsc.
var UserStatus;
(function (UserStatus) {
    UserStatus["Active"] = "active";
    UserStatus["Inactive"] = "inactive";
    UserStatus["Pending"] = "pending";
})(UserStatus || (UserStatus = {}));
function formatUserDisplay(user) {
    return `${user.name} (${user.status})`;
}
function filterUsers(users, filter) {
    return users.filter((user) => {
        const matchesStatus = filter.status ? user.status === filter.status : true;
        const matchesSearch = filter.search
            ? user.name.toLowerCase().includes(filter.search.toLowerCase()) ||
                (user.email ?? "").toLowerCase().includes(filter.search.toLowerCase())
            : true;
        return matchesStatus && matchesSearch;
    });
}
function sumValues(numbers) {
    return numbers.reduce((sum, value) => sum + value, 0);
}
function firstOrNull(items) {
    return items.length > 0 ? items[0] : null;
}
function mergeObjects(a, b) {
    return { ...a, ...b };
}
function isPerson(value) {
    return (typeof value === "object" &&
        value !== null &&
        "id" in value &&
        typeof value.id === "number" &&
        "name" in value &&
        typeof value.name === "string" &&
        "status" in value &&
        Object.values(UserStatus).includes(value.status));
}
function createUser(id, name, status, email) {
    return { id, name, status, email };
}
function runTests() {
    const users = [
        createUser(1, "Alice", UserStatus.Active, "alice@example.com"),
        createUser(2, "Bob", UserStatus.Pending),
        createUser(3, "Carol", UserStatus.Inactive, "carol@example.com"),
    ];
    console.assert(formatUserDisplay(users[0]) === "Alice (active)", "formatUserDisplay should include name and status");
    console.assert(filterUsers(users, { status: UserStatus.Active }).length === 1, "filterUsers should return only active users");
    console.assert(filterUsers(users, { search: "bob" }).length === 1, "filterUsers should search by name");
    console.assert(filterUsers(users, { search: "example" }).length === 2, "filterUsers should search by email too");
    console.assert(sumValues([1, 2, 3, 4]) === 10, "sumValues should add numbers correctly");
    console.assert(firstOrNull(users)?.name === "Alice", "firstOrNull should return first item or null");
    console.assert(firstOrNull([]) === null, "firstOrNull should return null for empty arrays");
    const merged = mergeObjects({ a: 1 }, { b: "test" });
    console.assert(merged.a === 1 && merged.b === "test", "mergeObjects should combine object fields");
    const maybePerson = {
        id: 4,
        name: "Dana",
        status: UserStatus.Active,
    };
    console.assert(isPerson(maybePerson), "isPerson should detect a valid Person object");
    console.log("All TypeScript practice tests passed.");
}
runTests();
