"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const realNames = [
  "Ezzoubeir", "Soumaya", "Amal", "Khaoula", "Selah", "Abdelghafour", "Houda", "Ahlam", "Mouad", "Meryem",
  "Inass", "Radia", "Zineb", "Ayoub", "MarieLaure", "Hassna", "Hajar", "Hamza", "Laila", "FatimaEzzahra",
  "Sanaa", "Douae", "Lamiae", "Fayza", "Imane", "Chaimaa"
]

export default function CircularTeamUI() {
  const [selectedTeacher, setSelectedTeacher] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const teachers = realNames.map((realName, index) => ({
    id: index,
    name: `Teacher ${realName}`,
    image: `/profs/${index + 1}.${realName}.png`,
  }))

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleTeacherClick = (index) => setSelectedTeacher(index)

  const configs = {
    desktop: { containerSize: 800, innerRadius: 160, outerRadius: 240, innerSize: 28, outerSize: 24, centerSize: 40 },
    tablet: { containerSize: 600, innerRadius: 120, outerRadius: 180, innerSize: 24, outerSize: 20, centerSize: 32 },
    mobile: { containerSize: 350, innerRadius: 80, outerRadius: 120, innerSize: 16, outerSize: 14, centerSize: 24 },
  }

  const getCirclePosition = (index, total, radius) => {
    const angle = (index * 360) / total - 90
    const radian = (angle * Math.PI) / 180
    return { x: Math.cos(radian) * radius, y: Math.sin(radian) * radius }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
  }

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 20 } },
  }

  const centerVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25, delay: 0.8 } },
  }

  const TeacherAvatar = ({ teacher, index, isInner, config, isSelected }) => {
    const position = getCirclePosition(index, isInner ? 10 : 16, isInner ? config.innerRadius : config.outerRadius)
    const size = isInner ? config.innerSize : config.outerSize

    return (
      <motion.div
        className="absolute cursor-pointer"
        style={{
          left: `calc(50% + ${position.x}px)`,
          top: `calc(50% + ${position.y}px)`,
          transform: "translate(-50%, -50%)",
        }}
        variants={avatarVariants}
        whileHover={{ scale: 1.4, zIndex: 50, transition: { type: "spring", stiffness: 400, damping: 25 } }}
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        onClick={() => handleTeacherClick(teacher.id)}
        animate={{ scale: isSelected ? 1.2 : 1, zIndex: isSelected ? 30 : 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div
          className={`relative rounded-full overflow-hidden border-4 transition-all duration-300 ${
            isSelected ? "border-red-500 shadow-lg shadow-red-500/30" : "border-blue-500 shadow-md shadow-blue-500/20"
          } bg-white`}
          style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
        >
          <img src={teacher.image || "/placeholder.svg"} alt={teacher.name} className="w-full h-full object-cover" />
          {isSelected && (
            <motion.div
              className="absolute inset-0 bg-red-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      </motion.div>
    )
  }

  const CenterDisplay = ({ teacher, config }) => (
    <div className="absolute inset-0 flex items-center justify-center lg:left-28 lg:top-30 md:left-24 md:top-26 sm:left-16 sm:top-18 left-16 top-18">
      <AnimatePresence mode="wait">
        <motion.div
          key={teacher.id}
          variants={centerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, scale: 0.8, rotateY: 90, transition: { duration: 0.3 } }}
          className="text-center"
        >
          <div className="relative inline-block group">
            <motion.div
              className="mx-auto rounded-full overflow-hidden border-4 border-red-500 shadow-2xl bg-gray-800"
              style={{ width: `${config.centerSize * 4}px`, height: `${config.centerSize * 4}px` }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
            >
              <img src={teacher.image || "/placeholder.svg"} alt={teacher.name} className="w-full h-full object-cover" />
            </motion.div>
            <div
              className="absolute z-50 left-1/2 -translate-x-1/2 -top-2 -translate-y-full
                       px-2 py-1 rounded bg-gray-900 text-white text-xs md:text-sm shadow-lg
                       opacity-0 group-hover:opacity-100 transition-opacity duration-200
                       pointer-events-none whitespace-nowrap"
            >
              {teacher.name}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )

  const CircularLayout = ({ config, screenClass }) => (
    <motion.div
      className={`${screenClass} relative`}
      style={{ width: `${config.containerSize}px`, height: `${config.containerSize}px` }}
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      {teachers.slice(0, 10).map((teacher, index) => (
        <TeacherAvatar
          key={teacher.id}
          teacher={teacher}
          index={index}
          isInner={true}
          config={config}
          isSelected={teacher.id === selectedTeacher}
        />
      ))}
      {teachers.slice(10).map((teacher, index) => (
        <TeacherAvatar
          key={teacher.id}
          teacher={teacher}
          index={index}
          isInner={false}
          config={config}
          isSelected={teacher.id === selectedTeacher}
        />
      ))}
      <CenterDisplay teacher={teachers[selectedTeacher]} config={config} />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/5 to-purple-500/5 blur-3xl pointer-events-none z-0" />
    </motion.div>
  )

  return (
    <div className="flex items-center justify-center w-full h-min-screen relative overflow-hidden">
      <CircularLayout config={configs.desktop} screenClass="hidden lg:block" />
      <CircularLayout config={configs.tablet} screenClass="hidden md:block lg:hidden" />
      <CircularLayout config={configs.mobile} screenClass="block md:hidden" />

      {/* <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  )
}