import React, { useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { IFixturesByLeague } from "../../interfaces/seasonResponse";
import { IFixture } from "../../interfaces/seasonResponse";
import moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackArrow } from "../../assets/iconWrappers/BackArrow";
import { Loader } from "../../component/Loader";

const mockResponse: IFixturesByLeague = {
  response: [
    {
      fixture: {
        date: "2021-01-12T20:15:00+00:00",
        venue: {
          name: "Turf Moor",
          city: "Burnley",
        },
        status: {
          short: "FT",
        },
      },
      teams: {
        home: {
          name: "Burnley",
          logo: "https://media.api-sports.io/football/teams/44.png",
        },
        away: {
          name: "Manchester United",
          logo: "https://media.api-sports.io/football/teams/33.png",
        },
      },
      goals: {
        home: 0,
        away: 1,
      },
    },
  ],
};
export const FixturesByLeague = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [fixtures, setFixtures] = React.useState<IFixture[] | null>(null);
  const navigation = useNavigation();
  const route = useRoute();

  //@ts-ignore
    const {league} = route?.params
  //@ts-ignore
    const {season} = route?.params

    

  useEffect(() => {
    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${league}&season=${season}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "71535109e2mshaeba54bcae6f51dp1c2a6fjsn6fef532752cf",
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      }
    ).then(async (response) => {
        const jsonResponse: IFixturesByLeague = await response.json();
        setFixtures(jsonResponse.response);
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }: { item: IFixture }) => {
    return (
      <View style={styles.seriesCard}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: 100,
            }}
          >
            <Image
              source={{ uri: item.teams.home.logo }}
              style={{
                width: 24,
                height: 24,
                borderRadius: 999,
                alignSelf: "center",
              }}
            />
            <Text style={[styles.cardHeading]}>{item.teams.home.name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.cardHeading]}
            >{`${item.goals.home} - ${item.goals.away}`}</Text>
            <Text style={[styles.cardHeading, { fontSize: 12, marginTop: 5 }]}>
              {item.fixture.status.short}
            </Text>
          </View>
          <View
            style={{
              width: 100,
            }}
          >
            <Image
              source={{ uri: item.teams.away.logo }}
              style={{
                width: 24,
                height: 24,
                borderRadius: 999,
                alignSelf: "center",
              }}
            />
            <Text style={[styles.cardHeading]}>{item.teams.away.name}</Text>
          </View>
        </View>

        <Text>{`Date : ${moment(item.fixture.date).format(
          "DD-MMM-YYYY"
        )}`}</Text>
        <Text>{`Venue : ${item.fixture.venue.name ?? "-"}, ${item.fixture.venue.city ?? "-"}`}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
      }}
    >
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          paddingTop: 10,
          paddingLeft: 10,
          marginVertical: 20,
        }}
      >
        <BackArrow />
      </Pressable>
      {fixtures?.length === 0 && !loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/sad-face.png")}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
          >
            No fixture found for this league
          </Text>
        </View>
      )}
      {loading ? (
        <Loader isVisible={loading} message="Loading fixtures"/>
      ) : (
        <FlatList data={fixtures} renderItem={renderItem} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  seriesCard: {
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#FFF9C4",
    marginVertical: 5,
    padding: 10,
    alignItems: "center",
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
});
