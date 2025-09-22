-- AddForeignKey
ALTER TABLE "hello-prisma"."Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "hello-prisma"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
