import { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Student = {
  id: string;
  name: string;
  year: string;
  photoUrl: string;
  flagged: boolean;
};

const initialStudents: Student[] = [
  {
    id: "s1",
    name: "Ana Cruz",
    year: "3rd Year",
    photoUrl: "https://i.pravatar.cc/100?img=1",
    flagged: false,
  },
  {
    id: "s2",
    name: "Bea Santos",
    year: "2nd Year",
    photoUrl: "https://i.pravatar.cc/100?img=2",
    flagged: false,
  },
  {
    id: "s3",
    name: "Cid Ramos",
    year: "4th Year",
    photoUrl: "https://i.pravatar.cc/100?img=3",
    flagged: false,
  },
  {
    id: "s4",
    name: "Dex Alonzo",
    year: "1st Year",
    photoUrl: "https://i.pravatar.cc/100?img=4",
    flagged: false,
  },
  {
    id: "s5",
    name: "Eli Tan",
    year: "3rd Year",
    photoUrl: "https://i.pravatar.cc/100?img=5",
    flagged: false,
  },
];

type StudentCardProps = {
  student: Student;
  onToggleFlag: (id: string) => void;
};

function StudentCard({ student, onToggleFlag }: StudentCardProps) {
  return (
    <View style={styles.studentCard}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: student.photoUrl }}
          style={styles.profileImage}
        />
        <View style={styles.onlineIndicator} />
      </View>

      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{student.name}</Text>
        <Text style={styles.studentYear}>
          ✦ {student.year}
        </Text>
        <Text style={styles.studentID}>STUDENT • {student.id.toUpperCase()}</Text>
      </View>

      <Pressable
        onPress={() => onToggleFlag(student.id)}
        style={[
          styles.flagButton,
          student.flagged && styles.flaggedButton,
        ]}
      >
        <Text
          style={[
            styles.flagText,
            student.flagged && styles.flaggedText,
          ]}
        >
          {student.flagged ? "★ Flagged" : "＋ Flag"}
        </Text>
      </Pressable>
    </View>
  );
}

export default function StudentDirectory() {
  const [students, setStudents] = useState(initialStudents);
  const [searchText, setSearchText] = useState("");

  const toggleFlag = (id: string) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id
          ? { ...student, flagged: !student.flagged }
          : student
      )
    );
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const flaggedCount = students.filter(
    (student) => student.flagged
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>✦</Text>
          <Text style={styles.welcomeText}>WELCOME TO</Text>
          <Text style={styles.title}>Student Directory</Text>
          <Text style={styles.subtitle}>
            Your campus community, all in one place.
          </Text>

          <View style={styles.headerBottom}>
            <View>
              <Text style={styles.headerNumber}>
                {students.length.toString().padStart(2, "0")}
              </Text>
              <Text style={styles.headerLabel}>TOTAL STUDENTS</Text>
            </View>

            <View style={styles.headerDivider} />

            <View>
              <Text style={styles.headerNumber}>
                {flaggedCount.toString().padStart(2, "0")}
              </Text>
              <Text style={styles.headerLabel}>FLAGGED</Text>
            </View>
          </View>
        </View>

        {/* SECTION TITLE */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Our Students</Text>
            <Text style={styles.sectionSubtitle}>
              Discover and manage profiles
            </Text>
          </View>
          <Text style={styles.sparkle}>✧</Text>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search student name..."
            placeholderTextColor="#A69ABF"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <Pressable onPress={() => setSearchText("")}>
              <Text style={styles.clearButton}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* STUDENT LIST */}
        <View style={styles.studentList}>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onToggleFlag={toggleFlag}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>✧</Text>
              <Text style={styles.emptyTitle}>No Students Found</Text>
              <Text style={styles.emptyText}>
                Try searching for another student name.
              </Text>
            </View>
          )}
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerIcon}>✦</Text>
          <Text style={styles.footerText}>
            MADE FOR OUR CAMPUS COMMUNITY
          </Text>
          <Text style={styles.footerSubtext}>
            Student Directory • 2026
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3FF",
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  // HEADER
  header: {
    backgroundColor: "#7651A8",
    padding: 23,
    borderRadius: 28,
    marginBottom: 28,
    marginTop: 10,
    elevation: 7,
    shadowColor: "#5B3B89",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    overflow: "hidden",
  },

  headerIcon: {
    fontSize: 35,
    color: "#E9D5FF",
    marginBottom: 8,
  },

  welcomeText: {
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 3,
    color: "#E6D5FF",
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 13,
    color: "#E8DDF8",
    marginTop: 7,
  },

  headerBottom: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#684593",
    padding: 16,
    borderRadius: 18,
    marginTop: 23,
  },

  headerNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  headerLabel: {
    fontSize: 9,
    color: "#E5D5F7",
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 3,
  },

  headerDivider: {
    width: 1,
    height: 38,
    backgroundColor: "#A88ACB",
    marginHorizontal: 35,
  },

  // SECTION
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 17,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#493365",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#9686AB",
    marginTop: 4,
  },

  sparkle: {
    fontSize: 35,
    color: "#A17ACF",
  },

  // SEARCH
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: "#E5D8F5",
    marginBottom: 20,
    elevation: 2,
  },

  searchIcon: {
    fontSize: 25,
    color: "#8965B4",
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 14,
    color: "#493365",
  },

  clearButton: {
    fontSize: 16,
    color: "#8965B4",
    padding: 5,
  },

  // STUDENT CARD
  studentList: {
    marginBottom: 10,
  },

  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EDE3F8",
    elevation: 3,
    shadowColor: "#7651A8",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  avatarContainer: {
    position: "relative",
  },

  profileImage: {
    width: 57,
    height: 57,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#DCC8F5",
    backgroundColor: "#EDE3F8",
  },

  onlineIndicator: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#A78BFA",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    bottom: 0,
    right: 0,
  },

  studentInfo: {
    flex: 1,
    marginLeft: 12,
  },

  studentName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#493365",
  },

  studentYear: {
    fontSize: 12,
    color: "#9874BE",
    marginTop: 5,
  },

  studentID: {
    fontSize: 8,
    color: "#B2A3C5",
    fontWeight: "bold",
    letterSpacing: 0.8,
    marginTop: 4,
  },

  // FLAG BUTTON
  flagButton: {
    backgroundColor: "#F1E9FC",
    paddingVertical: 9,
    paddingHorizontal: 11,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCC8F5",
  },

  flaggedButton: {
    backgroundColor: "#7651A8",
    borderColor: "#7651A8",
  },

  flagText: {
    color: "#7651A8",
    fontSize: 10,
    fontWeight: "bold",
  },

  flaggedText: {
    color: "#FFFFFF",
  },

  // EMPTY STATE
  emptyContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 20,
    marginTop: 10,
  },

  emptyIcon: {
    fontSize: 40,
    color: "#A17ACF",
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#493365",
    marginTop: 10,
  },

  emptyText: {
    textAlign: "center",
    color: "#A69ABF",
    marginTop: 7,
    fontSize: 12,
  },

  // FOOTER
  footer: {
    alignItems: "center",
    paddingVertical: 25,
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#E5D8F5",
  },

  footerIcon: {
    fontSize: 22,
    color: "#9874BE",
    marginBottom: 6,
  },

  footerText: {
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.5,
    color: "#7651A8",
  },

  footerSubtext: {
    fontSize: 11,
    color: "#B2A3C5",
    marginTop: 6,
  },
});