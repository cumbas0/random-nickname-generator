import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';
import fs from 'fs';

function generateUsernames(wordCount, includeNumbers) {
    const names = [];
    faker.locale = 'tr';  // Varsayılan olarak Türkçe seçiliyor
    for (let i = 0; i < 10; i++) {
        let words = [];
        for (let j = 0; j < wordCount; j++) {
            words.push(faker.lorem.word());
        }
        let username = words.join('');
        if (includeNumbers) {
            username += Math.floor(Math.random() * 100);
        }
        names.push(username);
    }
    return names;
}

inquirer
    .prompt([
        {
            type: 'list',
            name: 'wordCount',
            message: 'Username kaç kelime olsun?',
            choices: ['1', '2']
        },
        {
            type: 'list',
            name: 'includeNumbers',
            message: 'Sayı bulunsun mu?',
            choices: ['evet', 'hayır']
        }
    ])
    .then(answers => {
        const wordCount = parseInt(answers.wordCount, 10);
        const includeNumbers = answers.includeNumbers === 'evet';

        const usernames = generateUsernames(wordCount, includeNumbers);
        console.log('Oluşturulan Kullanıcı Adları:');
        usernames.forEach(username => console.log(username));

        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'saveToFile',
                    message: 'Usernameler indirilsin mi?',
                    choices: ['evet', 'hayır']
                }
            ])
            .then(answer => {
                if (answer.saveToFile === 'evet') {
                    fs.writeFileSync('usernames.txt', usernames.join('\n'));
                    console.log('Usernameler usernames.txt dosyasına kaydedildi.');
                }
            });
    });
