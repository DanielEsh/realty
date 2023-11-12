import requests
import random

print('start generation')

number = {
    min: 1,
    max: 350
}
type = ['FLAT', 'APARTMENT']
rooms = [0, 1, 2, 3, 4]
price = {
    min: 3_500_000,
    max: 80_000_000,
}
area = {
    min: 24.0,
    max: 80.0,
}
floor = {
    min: 1,
    max: 30,
}

totalFloors = [30]
plan = [0, 1, 2, 3]
furnish_ids = [None, 1, 2, 3]
property_ids = [1,2,3,4]
benefits_ids = [1,2,3,4,5,6,7,8,9,10]


def generate_property(): 
    generate_property = {
        'number': str(random.randint(number[min], number[max])),
        'type': random.choice(type),
        'rooms': random.choice(rooms),
        'price': random.randint(price[min], price[max]),
        'area': round(random.uniform(area[min], area[max]), 1),
        'floor': random.randint(floor[min], floor[max]),
        'total_floors': random.choice(totalFloors),
        'furnishId': random.choice(furnish_ids),
        'propertyId': random.choice(property_ids),
        'benefits': random.sample(benefits_ids, k=random.randint(0, min(6, len(benefits_ids))))
    }

    generate_property['plan'] = str(generate_property['rooms']) + '_' + str(random.choice(plan))

    if random.random() < 0.2:
        discount_percentage = 0.3

        originalPrice = generate_property['price']
        discount_price = round(generate_property['price'] * (1 - discount_percentage), 2)

        generate_property['originalPrice'] = originalPrice
        generate_property['price'] = discount_price 
    else: 
        generate_property['originalPrice'] = generate_property['price']

    return generate_property


# generate_object = generate_property()
# print(generate_object)


url = 'http://localhost:3000/api/filter'

# response = requests.post(url, json=generate_object)

# print(response.json())

items = 20

for _ in range(items):
    generate_object = generate_property()
    response = requests.post(url, json=generate_object)
    print('CREATED:', response.json())
    print('\n')


