import { initDatabase } from '@src/config/database.config';
import { EMAIL_ADDRESS } from '@src/config/env.config';
import { consoleLogger } from '@src/config/logger.config';
import { initMail, sendMail } from '@src/config/mail.config';
import { render } from '@src/config/view.config';
import { userRepository } from '@src/models/user/user.repository';
import UserListMail from '@src/resources/views/mails/user-list-mail';

const run = async () => {
  await initMail();
  await initDatabase();

  const users = await userRepository.find();

  await sendMail({
    to: EMAIL_ADDRESS,
    subject: 'Daily Report for Users',
    html: render(
      <UserListMail
        users={users.map((user) => ({ name: user.name || 'Anonymous User' }))}
      />
    ),
  });

  consoleLogger.info(`Sent mail to ${EMAIL_ADDRESS}`);

  process.exit(0);
};

run();
