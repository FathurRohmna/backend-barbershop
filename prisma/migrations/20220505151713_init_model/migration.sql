-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "registerAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "BarberUser" (
    "barberId" TEXT NOT NULL,
    "ratingAverage" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "barberUserId" TEXT NOT NULL,

    CONSTRAINT "BarberUser_pkey" PRIMARY KEY ("barberId")
);

-- CreateTable
CREATE TABLE "Booking" (
    "bookingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "userBookingId" TEXT NOT NULL,
    "barberUserId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "paymentBookingId" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("bookingId")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "feedbackId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bookingFeedbackId" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("feedbackId")
);

-- CreateTable
CREATE TABLE "HaircutModel" (
    "haircutModelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "proccessTime" INTEGER NOT NULL,

    CONSTRAINT "HaircutModel_pkey" PRIMARY KEY ("haircutModelId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "BarberUser_barberUserId_key" ON "BarberUser"("barberUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_bookingFeedbackId_key" ON "Feedback"("bookingFeedbackId");

-- CreateIndex
CREATE UNIQUE INDEX "HaircutModel_name_key" ON "HaircutModel"("name");

-- AddForeignKey
ALTER TABLE "BarberUser" ADD CONSTRAINT "BarberUser_barberUserId_fkey" FOREIGN KEY ("barberUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userBookingId_fkey" FOREIGN KEY ("userBookingId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_barberUserId_fkey" FOREIGN KEY ("barberUserId") REFERENCES "BarberUser"("barberId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "HaircutModel"("haircutModelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_paymentBookingId_fkey" FOREIGN KEY ("paymentBookingId") REFERENCES "Payment"("paymentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_bookingFeedbackId_fkey" FOREIGN KEY ("bookingFeedbackId") REFERENCES "Booking"("bookingId") ON DELETE RESTRICT ON UPDATE CASCADE;
