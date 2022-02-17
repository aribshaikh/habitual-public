import communityPostObj from "./communityPostObject";
import { commentsData } from "../comments/commentsData";

export const communityPostData = {
  TRENDING: [
    new communityPostObj(
      "Arib Shaikh",
      "arib_s",
      "Recently, I've been doing a lot of self-evaluation. As part of this process, I decided to go through my old journals to gain clarity on certain issues and review my life goals. I wanted to check if I am on the right path and to verify if my intentions are sincere. During this process, I came through a struggle I currently face which is praying my daily prayers on time. How can I review my life goals and ask God for help if I do not obey him?",
      commentsData
    ),
    new communityPostObj("Danyal Khan", "danyal_10", "My skin has been at its all time worse. I have so much acne and I've tried every product you could possibly think of but it just isn't getting any better. My doctor said I need to start drinking water regularly but I find it super difficult. I only like drinking fizzy drinks and want to stop.",commentsData),
    new communityPostObj(
      "Sarah Eddeb",
      "sarah_eddeb",
      "I need to stop comparing my life with everyone elses and be grateful for the things I do have.", 
      commentsData
    ),
    new communityPostObj(
      "Nima Hashi",
      "neemz",
      "It’s midterm season and my sleeping schedule has been all over the place. My dark circles are terrible.", 
      []
    ),
  ],
  STRESS: [
    new communityPostObj("Arib Shaikh", "arib_s", "I usually feel the most stressed during midterm season, and I dont know how to cope with it.",commentsData),
    new communityPostObj("Danyal Khan", "danyal_10", "I love my alone time. Not all the time, but sometimes.",commentsData),
    new communityPostObj("Sarah Eddeb", "sarah_eddeb", "Whenever I feel stressed I spend time with family and friends.",commentsData),
    new communityPostObj("Nima Hashi", "neemz", "To cope with my stress, I like to take time to do things I enjoy.",commentsData),
  ],
  TIME: [
    new communityPostObj("Arib Shaikh", "arib_s", "Lately, I've been finding it really hard to hand in my assignments on time because I have too much to do, and no time to do it.",commentsData),
    new communityPostObj("Danyal Khan", "danyal_10", "I spend all my time procastinating and then rush to get my work done last minute. Iv'e tried starting my work earlier but it just never works.",commentsData),
    new communityPostObj("Sarah Eddeb", "sarah_eddeb", "Over the years, my time management skills got a lot better becuase I have so much to do between school, work and family. The more free time I had before, the more time I would waste.",commentsData),
    new communityPostObj("Nima Hashi", "neemz", "I try my best to follow my daily schedules but almost always fail to do so.", commentsData),
  ],
  ORGANIZATION: [
    new communityPostObj("Arib Shaikh", "arib_s", "I try to be organized by writing my todo lists the night before.",commentsData),
    new communityPostObj("Danyal Khan", "danyal_10", "My life feels most organized when I sleep and wake up at a consistent time.",commentsData),
    new communityPostObj("Sarah Eddeb", "sarah_eddeb", "In order for me to function and work properly, my surrounding must be organized.",commentsData),
    new communityPostObj("Nima Hashi", "neemz", "Sundays are my days to make sure I start the week off on a good note.",commentsData),
  ],
};
