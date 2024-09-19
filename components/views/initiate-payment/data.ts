import { faker } from "@faker-js/faker";

import slugify from "slugify"

export type Option = {
    value: string
    label: string
}

function createRandomData(): Option {
    const label = faker.company.name()
    const value = slugify(label, {
        replacement: "-",
        lower: true
    })
    return {
        value,
        label
    }
}

export const fakerCompanies: Option[] = faker.helpers.multiple(createRandomData, { count: 7 });