import "regenerator-runtime/runtime";
import Pipe from "./Pipe";
import Filter from "./Filter";

class stripeMondoFilterAlgorithm {
    filter(d) {
        if (d !== "mondo") return d;
    }
}
class stripeEsclamationFilterAlgorithm {
    filter(d) {
        if (d !== "!") return d;
    }
}

const data = ["ciao", "mondo", "!"];
const stripeMondoFilter = Filter.create({
    options: {
        active: true,
        filterCallback: new stripeMondoFilterAlgorithm(),
    },
});

const stripeEsclamationFilter = Filter.create({
    options: {
        active: true,
        filterCallback: new stripeEsclamationFilterAlgorithm(),
    },
});

const filters = [stripeEsclamationFilter, stripeMondoFilter];

test("Should return data out of the pipe", () => {
    const pipe = new Pipe(data);
    let newData = pipe.write().toArray();
    expect(newData).toContain("ciao");
    expect(newData).toStrictEqual(data);
});

test("Should write hello world without !", () => {
    const pipe = new Pipe(data);
    let newData = pipe.write(stripeEsclamationFilter).toArray();
    expect(newData).toHaveLength(2);
    expect(newData).not.toContain("!");
});

test("Should write hello", () => {
    const pipe = new Pipe(data);
    let newData = pipe
        .write(stripeEsclamationFilter)
        .write(stripeMondoFilter)
        .toArray();
    expect(newData).toHaveLength(1);
    expect(newData).not.toContain("!");
    expect(newData).not.toContain("mondo");
});

test("Should write hello chaining write operations in a for loop", () => {
    let pipe = new Pipe(data);
    filters.forEach((f) => {
        pipe = pipe.write(f);
    });
    let newData = pipe.toArray();
    expect(newData).toHaveLength(1);
    expect(newData).not.toContain("!");
    expect(newData).not.toContain("mondo");
});

test("Should chain filters and write hello", () => {
    let pipe = new Pipe(data);
    let newData = pipe.chain(filters).toArray();
    expect(newData).toHaveLength(1);
    expect(newData).not.toContain("!");
    expect(newData).not.toContain("mondo");
});

test("Should chain filters", () => {
    let pipe = new Pipe(data);
    let newData = pipe.chain(filters).toArray();
    expect(newData).toHaveLength(1);
    expect(newData).not.toContain("!");
    expect(newData).not.toContain("mondo");
});

// test("Count mondo filter should run once", () => {

//     let c = 0;

//     const countCiaoFilter = Filter.create({
//         options: {
//             active: true,
//             filterCallback: (d) => {
//                 c++;
//                 return d;
//             },
//         },
//     });
//     let pipe = new Pipe(data);
//     let newData = pipe
//         .chain([stripeMondoFilter, stripeEsclamationFilter, countCiaoFilter])
//         .toArray();
//     expect(newData).toHaveLength(1);
//     expect(newData).not.toContain("!");
//     expect(newData).not.toContain("mondo");
//     expect(c).toBe(1);
// });
